<script lang="ts">
	import { nip19 } from 'nostr-tools';
	import type { Event as relayEvent, Relay } from 'nostr-tools';
	import Note from './Note.svelte';

	const npubToHexId = (npub: string) => {
		const { data: userId } = nip19.decode(npub);
		return userId as string;
	};

	export let pubkey: string;
	export let relayPool: Relay[];

	let notes: relayEvent[] = [];

	relayPool.forEach((relay) => {
		const sub = relay.sub([{ authors: [npubToHexId(pubkey)], kinds: [1] }]);
		sub.on('event', (event: relayEvent) => {
			notes = [...notes, event];
		});
	});
</script>

{#each notes as note}
	<Note {note} />
{/each}
