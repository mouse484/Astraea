<script lang="ts">
	import { useRelays } from '$lib/nostr/relays';
	import { noteQuery } from '$lib/query/note';
	import Profile from '../Profile/Profile.svelte';
	import NoteContent from './NoteContent.svelte';
	import Reactions from './Reactions.svelte';

	export let id: string;

	$: note = noteQuery(id, useRelays('read'));

	$: event = $note.data;
</script>

{#if event}
	<div class="border rounded p-2 flex-col flex gap-2">
		<div class="flex justify-between">
			<Profile pubkey={event.pubkey} />
			<div class="text-sm">{new Date(event.created_at * 1000).toLocaleString()}</div>
		</div>
		<NoteContent rawContent={event.content} />
		<Reactions {id} />
	</div>
{/if}
