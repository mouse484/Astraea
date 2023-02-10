<script lang="ts">
	import { npubToHexId } from '$lib/utils/key';
	import type { Event as relayEvent, Relay } from 'nostr-tools';
	import Note from './Note.svelte';

	export let pubkey: string;
	export let relayPool: Relay[];

	// limitのあとで実装
	let limit: number = 10;
	let notes: relayEvent[] = [];

	relayPool.forEach((relay) => {
		const sub = relay.sub([
			{ authors: [npubToHexId(pubkey)], kinds: [1], limit: limit - 1 }
		]);
		sub.on('event', (event: relayEvent) => {
			notes = [...notes, event];
		});
		sub.on('eose', console.log);
		sub.on('eose', () => {
			sub.unsub();
			notes = notes
				.filter((value, index, self) => {
					console.log('f');
					return self.findIndex((note) => note.id === value.id) === index;
				})
				.sort((a, b) => b.created_at - a.created_at);
		});
	});
</script>

<input type="text" bind:value={limit} />

{#if notes}
	{#each notes as note}
		<Note {note} />
	{/each}
{/if}
