<script lang="ts">
	import { contacts } from '$lib/data/profile';
	import type { Event as relayEvent } from 'nostr-tools';
	import { onMount } from 'svelte';
	import { writable } from 'svelte/store';
	import Note from '../Note.svelte';
	import { relayPool } from '$lib/utils/relay';

	const notes = writable<relayEvent[]>([]);

	$: authors = $contacts.map(([, id]) => id);

	onMount(async () => {
		relayPool
			.subscribe(1, {
				authors,
				since: Math.round(
					new Date().setMinutes(new Date().getMinutes() - 10) / 1000
				)
			})
			.on((event) => {
				notes.update((updater) =>
					[...updater, event].sort((a, b) => b.created_at - a.created_at)
				);
			});
	});
</script>

{#key $notes}
	{#each $notes as note}
		<Note {note} />
	{/each}
{/key}
