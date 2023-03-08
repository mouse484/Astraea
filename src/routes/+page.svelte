<script lang="ts">
	import Note from '$lib/components/Note/Note.svelte';
	import { myNpubHex } from '$lib/data/const';
	import { get, subscribe } from '$lib/utils/nostr';
	import type { Event } from 'nostr-tools';
	import { onMount } from 'svelte';
	import { writable } from 'svelte/store';

	const notes = writable<Event[]>([]);

	const getTimeline = (contacts: string[], first?: boolean) => {
		const sub = subscribe({
			kinds: [1],
			authors: contacts,
			since: Math.round(
				(first
					? new Date().setMinutes(new Date().getMinutes() - 10)
					: Date.now()) / 1000
			)
		});

		sub.on('event', (event: Event) => {
			notes.update((updater) =>
				[...updater, event].sort((a, b) => b.created_at - a.created_at)
			);
		});

		// subし直すの一旦やめておく
		// sub.on('eose', () => {
		// 	sub.unsub();
		// 	getTimeline(contacts);
		// });
	};

	onMount(async () => {
		const contacts = new Set<string>();

		const contactsEvent = await get({ kinds: [3], authors: [myNpubHex] });
		if (!contactsEvent) return;
		const tags = contactsEvent.tags as [string, string][];
		tags.forEach(([, id]) => {
			contacts.add(id);
		});

		getTimeline([...contacts], true);
	});
</script>

{#each $notes as note (note.id)}
	<Note {note} />
{/each}
