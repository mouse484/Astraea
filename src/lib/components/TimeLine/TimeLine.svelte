<script lang="ts">
	import { subscribeEvents } from '$lib/nostr/pool';
	import { setQuery } from '$lib/query/util';
	import type { Event, Filter, Sub } from 'nostr-tools';
	import { onDestroy, onMount } from 'svelte';
	import { writable } from 'svelte/store';
	import Note from '../Note/Note.svelte';

	const notes = writable<Event[]>([]);

	export let relays: string[];
	export let contacts: string[];
	export let filter: Filter = {};

	let sub: Sub;

	onMount(() => {
		sub = subscribeEvents(1, { authors: contacts, limit: 100, ...filter }, relays);
		sub.on('event', (event: Event) => {
			notes.set([...$notes, event]);
			setQuery(['note', event.id], event);
		});
	});
	onDestroy(() => {
		sub.unsub();
	});
</script>

<div class="flex flex-col gap-4">
	{#each $notes.sort((a, b) => b.created_at - a.created_at) as note (note.id)}
		<Note id={note.id} />
	{/each}
</div>
