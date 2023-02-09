<script lang="ts">
	import { onMount } from 'svelte';
	import { relayInit } from 'nostr-tools';

	import { relays, relayPool } from '$lib/data/relay';

	onMount(async () => {
		for (const url of $relays) {
			let relay = relayInit(url);
			await relay.connect();
			relay.on('connect', () => {
				console.log(`connected to ${relay.url}`);

				relayPool.update((current) => [...current, relay]);
			});
			relay.on('error', () => {
				console.log(`failed to connect to ${relay.url}`);
			});
		}
	});
</script>
