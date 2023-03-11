<script lang="ts">
	import Note from '$lib/components/Note/Note.svelte';
	import { subscribe } from '$lib/utils/nostr';
	import type { Event, Filter } from 'nostr-tools';
	import { onMount } from 'svelte';
	import { writable } from 'svelte/store';
	import { notes as noteStore } from '$lib/data/notes';

	export let authors: string[];
	export let filter: Omit<Filter, 'kinds' | 'authors'> = {};

	const notes = writable<Event[]>([]);

	onMount(() => {
		const sub = subscribe({
			...filter,
			kinds: [1],
			authors
		});

		sub.on('event', (event: Event) => {
			noteStore.update((updater) => updater.set(event.id, event));
			notes.update((updater) =>
				[...updater, event].sort((a, b) => b.created_at - a.created_at)
			);
		});
	});
</script>

{#each $notes as note (note.id)}
	<Note {note} />
{/each}
