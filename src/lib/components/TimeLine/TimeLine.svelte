<script lang="ts">
	import { subscribeEvents } from '$lib/nostr/pool';
	import { setQuery } from '$lib/query/util';
	import type { Event, Filter } from 'nostr-tools';
	import { onMount } from 'svelte';
	import { writable } from 'svelte/store';
	import Note from '../Note/Note.svelte';

	const notes = writable<Event[]>([]);

	export let relays: string[];
	export let contacts: string[];
	export let filter: Filter = {};

	onMount(() => {
		const sub = subscribeEvents(1, { authors: contacts, limit: 100, ...filter }, relays);
		sub.on('event', (event: Event) => {
			notes.set([...$notes, event]);
			setQuery(['note', event.id], event);
		});
	});
</script>

{#each $notes.sort((a, b) => b.created_at - a.created_at) as note (note.id)}
	<Note id={note.id} />
{/each}
