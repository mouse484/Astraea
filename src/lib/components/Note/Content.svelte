<script lang="ts">
	import DOMPurify from 'isomorphic-dompurify';
	import MarkdownIt from 'markdown-it';

	const { sanitize } = DOMPurify;

	export let rawContent: string;

	const md = MarkdownIt({ linkify: true, breaks: true });

	const sanitized = sanitize(rawContent);

	const parsed = md.parse(sanitized, {});

	// index, tag, href/src
	let next: [number | undefined, string, string] = [undefined, '', ''];

	const linkStart = (index: number, href: string) => {
		const isImage = href?.match(/(jpe?g|png|gif|webp)$/);
		next = [(index += 1), isImage ? 'img' : 'a', href];
		return '';
	};
</script>

<div class="break-words">
	{#each parsed as token}
		{#if token.type === 'inline'}
			{#each token.children || [] as child, index}
				{@const content = child.content}
				{#if child.type === 'text'}
					{@const [i, tag, href] = next}
					{#if i === index}
						{#if tag === 'a'}
							<a {href}>{content}</a>
						{:else if tag === 'img'}
							<img
								class="h-48 border-2 border-indigo-200 p-1 rounded"
								src={href}
								alt={content}
							/>
						{/if}
					{:else}
						<p>{content}</p>
					{/if}
				{:else if child.tag === 'br'}
					<br />
				{:else if child.type === 'link_open'}
					{linkStart(index, child.attrGet('href') || '')}
				{/if}
			{/each}
		{/if}
	{/each}
</div>
