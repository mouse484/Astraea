<script lang="ts">
	import { useRelays } from '$lib/nostr/pool';
	import { noteQuery } from '$lib/query/note';
	import type { Event } from 'nostr-tools';
	import { writable } from 'svelte/store';
	import Profile from '../Profile/Profile.svelte';
	import Reactions from './Reactions.svelte';

	export let id: string;

	const useReactions = writable(new Map<string, Event>());

	$: note = noteQuery(id, useRelays('read'));

	$: event = $note.data;
</script>

{#if event}
	<div class="border rounded p-2 flex-col flex gap-2">
		<div class="flex justify-between">
			<Profile pubkey={event.pubkey} />
			<div class="text-sm">{new Date(event.created_at * 1000).toLocaleString()}</div>
		</div>
		<div>
			{event.content}
		</div>
		<Reactions {id} />
	</div>
{/if}
