<script lang="ts">
	import type { Event } from 'nostr-tools';
	import Profile from '../Profile.svelte';
	import Content from './Content.svelte';

	export let note: Event;
</script>

<div>
	{#if note.pubkey}
		<Profile npubHex={note.pubkey} />
	{/if}
	<div>
		<Content rawContent={note.content} />
	</div>
</div>
