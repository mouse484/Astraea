<script lang="ts">
	import { profiles } from '$lib/data/profiles';
	import DOMPurify from 'isomorphic-dompurify';
	import MarkdownIt from 'markdown-it';
	import type { Event } from 'nostr-tools';
	import { Lightbox } from 'svelte-lightbox';

	const { sanitize } = DOMPurify;

	export let rawContent: string;
	export let event: Event;

	const md = MarkdownIt({ linkify: true, breaks: true });

	const replasedContent = rawContent.replaceAll(
		/#\[([0-9])\]/g,
		(match, $1) => {
			const tag = event.tags[$1] as ['p', string];
			if (tag) {
				const [type, id] = tag;
				if (type === 'p') {
					const profile = $profiles.get(id);
					return `[@${
						profile?.name || `${id.substring(0, 8)}...`
					}](/profile/${id})`;
				}
				return match;
			} else {
				return match;
			}
		}
	);

	const sanitized = sanitize(replasedContent);

	const parsed = md.parse(sanitized, {});

	// key: tokenIndex rest: childIndex, tag, href/src
	let next = new Map<number, [number | undefined, string, string]>();

	const linkStart = (tokenIndex: number, childIndex: number, href: string) => {
		const isImage = href?.match(/(jpe?g|png|gif|webp)$/);
		next.set(tokenIndex, [(childIndex += 1), isImage ? 'img' : 'a', href]);
		return '';
	};
</script>

<div class="break-words">
	{#each parsed as token, tokenIndex}
		{#if token.type === 'inline'}
			{#each token.children || [] as child, childIndex}
				{@const content = child.content}
				{#if child.type === 'text'}
					{@const [i, tag, href] = next.get(tokenIndex) || []}
					{#if i === childIndex}
						<!-- Link content -->
						{#if tag === 'a'}
							<a {href}>{content}</a>
						{:else if tag === 'img'}
							<div class="p-1 mt-4 rounded border-2 border-indigo-200 w-fit">
								<Lightbox
									customization={{ thumbnailProps: { class: 'flex h-60' } }}
								>
									<img src={href} alt={content} />
								</Lightbox>
							</div>
						{/if}
					{:else}
						<!-- normal content -->
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
			{/each}
		{/if}
	{/each}
</div>
