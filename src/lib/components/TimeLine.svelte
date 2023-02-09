<script lang="ts">
	import { onMount } from 'svelte';
	import { nip19, relayInit } from 'nostr-tools';
	import type { Event as relayEvent } from 'nostr-tools';
	import Note from './Note.svelte';

	const npubToHexId = (npub: string) => {
		const { data: userId } = nip19.decode(npub);
		return userId as string;
	};

	export let pubkey: string;
	export let relays: string[];

	let notes: relayEvent[] = [];

	onMount(async () => {
		// nostr-toolsのpoolが動かないから仮
		for (const url of relays) {
			let relay = relayInit(url);
			await relay.connect();
			relay.on('connect', () => {
				console.log(`connected to ${relay.url}`);
			});
			relay.on('error', () => {
				console.log(`failed to connect to ${relay.url}`);
			});

			const sub = relay.sub([{ authors: [npubToHexId(pubkey)], kinds: [1] }]);
			sub.on('event', (event: relayEvent) => {
				notes = [...notes, event];
			});
		}
	});
</script>

{#each notes as note}
	<Note {note} />
{/each}
