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

		relays.set(defaultRelays);
		relayPool.set(pool);
	});
</script>
