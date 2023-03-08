<script lang="ts">
	import type { Event } from 'nostr-tools';
	import Profile from './Profile.svelte';

	export let note: Event;
</script>

<div>
	{#if note.pubkey}
		<Profile npubHex={note.pubkey} />
	{/if}
	<div>
		{note.content}
	</div>
</div>
