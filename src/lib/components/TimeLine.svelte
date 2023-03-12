<script lang="ts">
	import Note from '$lib/components/Note/Note.svelte';
	import { notes, notesUpdater } from '$lib/data/notes';
	import { get, subscribe } from '$lib/utils/nostr';
	import type { Event, Filter } from 'nostr-tools';
	import { onMount } from 'svelte';

	export let authors: string[];
	export let filter: Omit<Filter, 'kinds' | 'authors'> = {};

	const getNote = async (id: string) => {
		return new Promise<Event>(async (resolve, reject) => {
			const note = $notes.get(id);
			if (note?.root) {
				resolve(note.root);
			} else {
				const event = await get({ kinds: [1], ids: [id] });
				if (event) {
					notesUpdater(event.id, event, 'root');
					resolve(event);
				} else {
					reject();
				}
			}
		});
	};

	onMount(async () => {
		const sub = subscribe({
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
			return notesUpdater(event.id, event, 'root');
		});
	});

	$: useNotes = [...$notes.entries()]
		.filter(([, { root }]) => root?.pubkey && authors.includes(root.pubkey))
		.sort(([, { updated: a }], [, { updated: b }]) => (a < b ? 1 : -1));
</script>

{#each useNotes as [id, { root, reply }] ([id])}
	{#if root}
		<Note note={root} />
	{:else}
		{#await getNote(id)}
			<p>Loading...</p>
		{:then event}
			<Note note={event} />
		{:catch}
			<p>note:{id}</p>
		{/await}
	{/if}
	{#if reply}
		{#each [...reply.values()] as event}
			<Note note={event} isReplay={true} />
		{/each}
	{/if}
{/each}
