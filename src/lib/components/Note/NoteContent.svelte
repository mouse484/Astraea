<script lang="ts">
	// import NoteLink from './NoteLink.svelte';
	// import NostrLinker from './NostrLinker.svelte';
	import type { Event } from 'nostr-tools';
	// import CustomEmoji from './CustomEmoji.svelte';

	export let event: Event;

	// const emojis = Object.fromEntries(
	// 	event.tags.filter(([key]) => key === 'emoji').map(([, code, url]) => [code, url])
	// );
</script>

{event.content}
