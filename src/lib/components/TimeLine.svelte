<script lang="ts">
	import Note from '$lib/components/Note/Note.svelte';
	import { notes } from '$lib/data/notes';
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
					notes.update((i) => {
						const current = i.get(event.id) || {};
						return i.set(id, {
							...current,
							updated: new Date(event.created_at * 1000),
							root: event
						});
					});
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
			notes.update((i) => {
				const current = i.get(event.id) || { reply: new Map() };
				if (event.tags) {
					let eTagCount = 0;
					const tag = event.tags.find(([type, , , marker]) => {
						return (
							type === 'e' &&
							((!marker && eTagCount === 0) || marker === 'reply')
						);
					});

					if (tag) {
						const [, id] = tag;
						return i.set(id, {
							...current,
							updated: new Date(event.created_at * 1000),
							reply: (current.reply || new Map()).set(event.id, event)
						});
					}
				}
				return i.set(event.id, {
					...current,
					updated: new Date(event.created_at * 1000),
					root: event
				});
			});
		});
	});

	$: useNotes = [...$notes.entries()].sort(
		([, { updated: a }], [, { updated: b }]) => (a < b ? 1 : -1)
	);
</script>

{#each useNotes as [id, { root, reply }] ([id])}
	{#if root}
		<Note note={root} />
	{:else}
		{#await getNote(id)}
			<p>Loading...</p>
		{:then event}
			<Note note={event} />
		{/await}
	{/if}
	{#if reply}
		{#each [...reply.values()] as event}
			<Note note={event} isReplay={true} />
		{/each}
	{/if}
{/each}
