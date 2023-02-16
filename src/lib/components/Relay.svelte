<script lang="ts">
	import { onMount } from 'svelte';
	import { SimplePool } from 'nostr-tools';

	import { relays, relayPool } from '$lib/data/relay';

	onMount(async () => {
		const pool = new SimplePool();

		for await (const url of $relays) {
			let relay = await pool.ensureRelay(url);
			relay.on('connect', () => {
				console.log(`connected to ${relay.url}`);
			});
			relay.on('error', () => {
				console.log(`failed to connect to ${relay.url}`);
			});
		}
		relayPool.set(pool);
	});
</script>
