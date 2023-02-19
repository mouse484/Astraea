<script lang="ts">
	import { contacts } from '$lib/data/profile';
	import { relayPool, relays } from '$lib/data/relay';
	import type { Event, Event as relayEvent } from 'nostr-tools';
	import { onMount } from 'svelte';
	import { writable } from 'svelte/store';
	import Note from '../Note.svelte';

	const notes = writable<relayEvent[]>([]);

	// let notes: relayEvent[] = [];
	$: ids = $contacts.map(([, id]) => id);

	onMount(async () => {
		// notes = (
		// 	await $relayPool.list($relays, [
		// 		{
		// 			authors: ids,
		// 			kinds: [1]
		// 		}
		// 	])
		// ).sort((a, b) => b.created_at - a.created_at);

		const subs = $relayPool.sub($relays, [
			{
				authors: ids,
				kinds: [1],
				since: Math.round(
					new Date().setMinutes(new Date().getMinutes() - 10) / 1000
				)
			}
		]);

		subs.on('event', (event: Event) => {
			// notes = [event, ...notes];
			notes.update((updater) =>
				[...updater, event].sort((a, b) => b.created_at - a.created_at)
			);
		});

		// subs.on('eose', () => {
		// 	subs.unsub();
		// });
	});
</script>

{#key $notes}
	{#each $notes as note}
		<Note {note} />
	{/each}
{/key}
