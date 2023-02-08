<script lang="ts">
	import { relayInit, nip19 } from 'nostr-tools';
	import { onMount } from 'svelte';

	let status = { relay: { connect: false } };

	let posts: HTMLDivElement;

	onMount(async () => {
		const relay = relayInit('wss://relay.damus.io');
		await relay.connect();

		relay.on('connect', () => (status.relay.connect = true));

		const sub = relay.sub([
			{
				since: Math.floor(new Date().getTime() / 1000),
				// authors: [''],
				kinds: [1]
			}
		]);

		sub.on('event', (event: { content: string }) => {
			const child = document.createElement('span');
			child.classList.add('post');
			child.textContent = event.content;
			posts.appendChild(child);
		});
	});
</script>

<div>
	リレー: {status.relay.connect && '接続'}
</div>

<div class="posts" bind:this={posts} />

<style>
	.posts {
		display: flex;
		flex-direction: column;
		gap: 2rem;
	}
</style>
