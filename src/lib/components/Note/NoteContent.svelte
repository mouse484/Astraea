<script lang="ts">
	import type { Event } from 'nostr-tools';

	import Markdown, { type Plugin } from 'svelte-exmarkdown';
	import { gfmPlugin } from 'svelte-exmarkdown/gfm';
	import remarkBreaks from 'remark-breaks';

	import Link from './NoteContent/Link.svelte';

	// import NostrLinker from './NostrLinker.svelte';
	// import CustomEmoji from './CustomEmoji.svelte';

	export let event: Event;

	// const emojis = Object.fromEntries(
	// 	event.tags.filter(([key]) => key === 'emoji').map(([, code, url]) => [code, url])
	// );

	const plugins: Plugin[] = [gfmPlugin, { remarkPlugin: remarkBreaks }, { renderer: { a: Link } }];
</script>

<Markdown md={event.content} {plugins} />
