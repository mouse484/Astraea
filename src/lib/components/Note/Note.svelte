<script lang="ts">
	import { useRelays } from '$lib/nostr/pool';
	import { noteQuery } from '$lib/query/note';
	import Profile from '../Profile/Profile.svelte';

	export let id: string;

	$: note = noteQuery(id, useRelays('read'));

	$: event = $note.data;
</script>

{#if event}
	<div>
		<Profile pubkey={event.pubkey} />
		<div class="mt-2">
			{event.content}
		</div>
	</div>
{/if}
