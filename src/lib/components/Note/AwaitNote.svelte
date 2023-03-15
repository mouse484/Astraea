<script lang="ts">
	import { notes, notesUpdater, noteWaiteList } from '$lib/data/notes';
	import { getEvent, subscribeEvents } from '$lib/utils/nostr';
	import type { Event, Sub } from 'nostr-tools';
	import { get } from 'svelte/store';
	import Note from './Note.svelte';

	export let id: string;

	export const getNote = async (id: string) => {
		const note = get(notes).get(id);
		if (note?.root) {
			return note.root;
		} else if ($noteWaiteList.has(id)) {
			return;
		} else {
			return new Promise<Event>((resolve) => {
				noteWaiteList.update((n) => n.add(id));
				const sub = subscribeEvents({ kinds: [1], ids: [id], limit: 1 });
				sub.on('event', (event: Event) => {
					notesUpdater(id, event, 'root');
					noteWaiteList.update((n) => {
						n.delete(id);
						return n;
					});
					resolve(event);
					sub.unsub();
				});
			});
		}
	};
</script>

{#await getNote(id)}
	<p>Loading...</p>
{:then event}
	{#if event}
		<Note note={event} />
	{/if}
{:catch}
	<a class="text-blue-600 visited:text-purple-600" href="/note/{id}">
		note:{id.substring(0, 8)}..
	</a>
{/await}
