<script lang="ts">
	import { relayPool, relays } from '$lib/data/relay';
	import { npubToHexId } from '$lib/utils/key';
	import type { Event as relayEvent, SimplePool } from 'nostr-tools';
	import { onMount } from 'svelte';
	import Note from './Note.svelte';

	export let pubkey: string;

	// limitのあとで実装
	let limit: number = 10;
	let notes: relayEvent[] = [];

	if ($relayPool) {
		const subs = $relayPool.sub($relays, [
			{ authors: [npubToHexId(pubkey)], kinds: [1], limit: limit - 1 }
		]);

		subs.on('event', (event: relayEvent) => {
			notes = [...notes, event];
		});

		subs.on('eose', () => {
			subs.unsub();
			notes = notes
				.filter((value, index, self) => {
					return self.findIndex((note) => note.id === value.id) === index;
				})
				.sort((a, b) => b.created_at - a.created_at);
		});
	}
</script>

<input type="text" bind:value={limit} />

{#if notes}
	{#each notes as note}
		<Note {note} />
	{/each}
{/if}
