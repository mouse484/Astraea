<script lang="ts">
	import { notes, notesUpdater } from '$lib/data/notes';
	import { subscribeEvents } from '$lib/utils/nostr';
	import type { Event, Filter, Sub } from 'nostr-tools';
	import { onDestroy, onMount } from 'svelte';
	import { writable } from 'svelte/store';
	import Loading from './elements/Loading.svelte';
	import NoteAndReplay from './Note/NoteAndReplay.svelte';

	export let authors: string[];
	export let filter: Omit<Filter, 'kinds' | 'authors'> = {};

	let isEose = false;
	const timeLineNotes = writable(new Map<string, Event>());

	onMount(async () => {
		const sub = subscribeEvents({
			kinds: [1],
			authors,
			...filter
		});

		sub.on('event', (event: Event) => {
			if (event.tags) {
				const tag = event.tags.find(([type, , , marker]) => {
					return type === 'e' && (!marker || marker === 'reply');
				});

				if (tag) {
					const [, id] = tag;
					return notesUpdater(id, event, 'reply');
				}
			}
			timeLineNotes.update((t) => t.set(event.id, event));
			return notesUpdater(event.id, event, 'root');
		});

		sub.on('eose', () => {
			isEose = true;
		});
	});

	$: useNotes = [...$timeLineNotes.entries()].sort(
		([, { created_at: a }], [, { created_at: b }]) => (a < b ? 1 : -1)
	);
</script>

{#if isEose}
	{#each useNotes as [id] ([id])}
		<NoteAndReplay {id} />
	{/each}
{:else}
	<Loading>Notes</Loading>
{/if}
