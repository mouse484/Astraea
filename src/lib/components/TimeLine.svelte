<script lang="ts">
	import { RelayPool } from 'nostr-relaypool';
	import { onMount } from 'svelte';
	import { nip19 } from 'nostr-tools';

	const npubToHexId = (npub: string) => {
		const { data: userId } = nip19.decode(npub);
		return userId as string;
	};

	let timeline: HTMLDivElement;

	export let pubkey: string;
	export let relays: string[];

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
				const child = document.createElement('span');
				child.classList.add('post');
				child.textContent = event.content;
				timeline.appendChild(child);
			},
			undefined
		);
	});
</script>

<div bind:this={timeline} />

<style>
	div {
		margin-top: 5rem;

		display: flex;
		flex-direction: column;
		gap: 2rem;
	}
</style>
