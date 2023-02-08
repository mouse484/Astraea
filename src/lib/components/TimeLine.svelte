<script lang="ts">
	import { onMount } from 'svelte';
	import { RelayPool } from 'nostr-relaypool';
	import type { Event as relaypoolEvent } from 'nostr-relaypool/event';
	import { nip19 } from 'nostr-tools';
	import Note from './Note.svelte';

	const npubToHexId = (npub: string) => {
		const { data: userId } = nip19.decode(npub);
		return userId as string;
	};

	export let pubkey: string;
	export let relays: string[];

	let notes: relaypoolEvent[] = [];

	onMount(async () => {
		const relayPool = new RelayPool(relays);

		relayPool.subscribe(
			[
				{
					authors: [npubToHexId(pubkey)],
					kinds: [1]
				}
			],
			relays,
			(event, isAfterEose, relayURL) => {
				console.log(event, isAfterEose, relayURL);
				notes = [...notes, event]; // これ数多いと問題起きるんじゃねと思っている
			},
			undefined
		);
	});
</script>

{#each notes as note}
	<Note {note} />
{/each}
