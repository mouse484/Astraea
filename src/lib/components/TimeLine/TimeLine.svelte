<script lang="ts">
	import { pool } from '$lib/nostr/pool';
	import { getQueryClient } from '$lib/query/util';
	import type { Event, Filter } from 'nostr-tools';
	import { onDestroy, onMount } from 'svelte';
	import { writable } from 'svelte/store';
	import Note from '../Note/Note.svelte';

	const queryClient = getQueryClient();

	const notes = writable<Event[]>([]);

	export let relays: string[];
	export let contacts: string[];
	export let filter: Filter = {};

	let unsub: () => void;

	onMount(() => {
		unsub = pool.subscribe(
			[{ kinds: [1], authors: contacts, limit: 100, ...filter }],
			relays,
			(event) => {
				notes.set([...$notes, event]);
				queryClient.setQueryData(['note', event.id], event);
			}
		);
	});
	onDestroy(() => {
		unsub();
	});
</script>

<div class="flex flex-col gap-4">
	{#each $notes.sort((a, b) => b.created_at - a.created_at) as note (note.id)}
		<Note id={note.id} />
	{/each}
</div>
