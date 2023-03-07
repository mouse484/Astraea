<script lang="ts">
	import type { Event as relayEvent } from 'nostr-tools';
	import { onMount } from 'svelte';
	import { writable } from 'svelte/store';
	import Note from '../Note.svelte';
	import { relayPool } from '$lib/utils/relay';

	const notes = writable<relayEvent[]>([]);

	export let authors: string[];
	export let time: 'ALL' | '10min' = '10min';

	const times: { [key in typeof time]: number } = {
		ALL: 0,
		'10min': Math.round(
			new Date().setMinutes(new Date().getMinutes() - 10) / 1000
		)
	};

	onMount(async () => {
		relayPool
			.subscribe(1, {
				authors,
				since: times[time]
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
