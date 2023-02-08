<script lang="ts">
	import { RelayPool } from 'nostr-relaypool';
	import { onMount } from 'svelte';
	import { nip19 } from 'nostr-tools';

	const npubToHexId = (npub: string) => {
		const { data: userId } = nip19.decode(npub);
		return userId as string;
	};

	let userId = 'npub1ecxns5jjwvaasnq7nnna0nd4wvacqgdmpvm5pjzdrpzcp06q863s0w23y6';
	let posts: HTMLDivElement;

	const relays = ['wss://relay.damus.io'];

	onMount(async () => {
		const relayPool = new RelayPool(relays);

		relayPool.subscribe(
			[
				{
					authors: [npubToHexId(userId)],
					kinds: [1]
				}
			],
			relays,
			(event, isAfterEose, relayURL) => {
				console.log(event, isAfterEose, relayURL);
				const child = document.createElement('span');
				child.classList.add('post');
				child.textContent = event.content;
				posts.appendChild(child);
			},
			undefined
		);
	});
</script>

<div>
	リレー: {relays}
</div>
<input type="text" bind:value={userId} />

<div class="posts" bind:this={posts} />

<style>
	.posts {
		margin-top: 5rem;

		display: flex;
		flex-direction: column;
		gap: 2rem;
	}
	input {
		width: 100%;
	}
</style>
