<script lang="ts">
	import { onMount } from 'svelte';
	import { SimplePool } from 'nostr-tools';

	import { relays, relayPool } from '$lib/data/relay';

	const defaultRelays = [
		'wss://relay.damus.io',
		'wss://relay.snort.social',
		'wss://eden.nostr.land'
	];

	onMount(async () => {
		const pool = new SimplePool();

		for (const url of defaultRelays) {
			let relay = await pool.ensureRelay(url);
			relay.on('connect', () => {
				console.log(`connected to ${relay.url}`);
				relays.update((updater) => [...updater, relay.url]);
			});
			relay.on('error', () => {
				console.log(`failed to connect to ${relay.url}`);
			});
		}
		relayPool.set(pool);
	});
</script>
