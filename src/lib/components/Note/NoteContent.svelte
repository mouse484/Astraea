<script lang="ts">
	import type { Event } from 'nostr-tools';

	import Markdown, { type Plugin } from 'svelte-exmarkdown';
	import { gfmPlugin } from 'svelte-exmarkdown/gfm';
	import remarkBreaks from 'remark-breaks';
	import { rehypeNostrContent } from '$lib/utils/unifiedPlugins';

	import Link from './NoteContent/Link.svelte';
	import CustomEmoji from './NoteContent/CustomEmoji.svelte';
	import Nostr from './NoteContent/Nostr.svelte';

	export let event: Event;

	const emojis = Object.fromEntries(
		event.tags.filter(([key]) => key === 'emoji').map(([, code, url]) => [code, url])
	);

	const plugins: Plugin[] = [
		gfmPlugin,
		{ remarkPlugin: remarkBreaks },
		{ rehypePlugin: [rehypeNostrContent, { emojis }] },
		{ renderer: { a: Link, nostr: Nostr, emoji: CustomEmoji } }
	];
</script>

<Markdown md={event.content} {plugins} />
