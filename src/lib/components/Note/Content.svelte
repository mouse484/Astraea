<script lang="ts">
	import { profiles, profileScheme } from '$lib/store/profiles';
	import DOMPurify from 'isomorphic-dompurify';
	import MarkdownIt from 'markdown-it';
	import { Lightbox } from 'svelte-lightbox';
	import NoteWithId from './NoteWithId.svelte';

	const { sanitize } = DOMPurify;

	export let rawContent: string;
	export let tags: string[][];

	const md = MarkdownIt({ linkify: true, breaks: true });
	md.linkify.add('#', {
		validate: /[^\s]+/,
		normalize(match) {
			match.url = `search?q=${match.url.replace('#', '')}`;
		}
	});

	const replasedContent = rawContent.replaceAll(
		/#\[([0-9])\]/g,
		(match, $1: number) => {
			const tag = tags[$1] as ['p' | 'e', string];
			if (tag) {
				const [type, id] = tag;
				if (type === 'p') {
					const event = profiles.get(id);
					const parsed = profileScheme.safeParse(event?.content);
					const profile = parsed.success ? parsed.data : undefined;
					return `[@${
						profile?.name || `${id.substring(0, 8)}...`
					}](/profile/${id})`;
				} else if (type === 'e') {
					return `[note](${id})`;
				}
			}
			return match;
		}
	);

	const sanitized = sanitize(replasedContent);

	const parsed = md.parse(sanitized, {});

	// key: tokenIndex rest: childIndex, tag, href/src
	let next = new Map<number, [number | undefined, string, string]>();

	const linkStart = (tokenIndex: number, childIndex: number, href: string) => {
		const isImage = href?.match(/\.(jpe?g|png|gif|webp)(\??.*)$/);
		next.set(tokenIndex, [(childIndex += 1), isImage ? 'img' : 'a', href]);
		return '';
	};
</script>

<div class="overflow-hidden break-words break-all">
	{#each parsed as token, tokenIndex}
		{#if token.type === 'inline'}
			{#if token.children}
				<p>
					{#each token.children as child, childIndex}
						{@const content = child.content}
						{#if child.type === 'text'}
							{@const [i, tag, href] = next.get(tokenIndex) || []}
							{#if i === childIndex}
								<!-- Link content -->
								{#if child.content === 'note'}
									{#if href}
										<NoteWithId id={href} />
									{/if}
								{:else if tag === 'a'}
									{@const isHashTag = content.startsWith('#')}
									<a
										class="text-blue-600 visited:text-purple-600 break-words"
										{href}
										target={isHashTag ? '' : '_blank'}
										rel={isHashTag ? '' : 'noopener noreferrer'}
									>
										{content}
									</a>
								{:else if tag === 'img'}
									<div
										class="p-1 mt-4 rounded border-2 border-indigo-200 w-fit"
									>
										<Lightbox
											customization={{ thumbnailProps: { class: 'flex h-60' } }}
										>
											<img src={href} alt={content} />
										</Lightbox>
									</div>
								{/if}
							{:else if content}
								<span>{content}</span>
							{/if}
						{:else if child.tag === 'br'}
							<br />
						{:else if child.type === 'link_open'}
							{linkStart(tokenIndex, childIndex, child.attrGet('href') || '')}
						{:else if child.tag === 'code'}
							<pre><code>{content}</code></pre>
						{:else}
							<span>{content}</span>
						{/if}
						{#if childIndex === token.children.length - 1}
							<br />
						{/if}
					{/each}
				</p>
			{/if}
		{/if}
		{#if tokenIndex !== parsed.length - 1 && token.type === 'paragraph_close'}
			<br />
		{/if}
	{/each}
</div>
