<script lang="ts">
	import type { Event } from 'nostr-tools';
	import Profile from './Profile.svelte';

	export let note: Event;
</script>

<div>
	<Profile npubHex={note.pubkey} />
	<div>
		{note.content}
	</div>
</div>
