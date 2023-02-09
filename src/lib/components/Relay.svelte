<script lang="ts">
	import { onMount, createEventDispatcher } from 'svelte';
	import { relayInit, type Relay } from 'nostr-tools';

	const dispatch = createEventDispatcher<{ relay: Relay }>();

	export let relays: string[];

	onMount(async () => {
		for (const url of relays) {
			let relay = relayInit(url);
			await relay.connect();
			relay.on('connect', () => {
				console.log(`connected to ${relay.url}`);
				dispatch('relay', relay);
			});
			relay.on('error', () => {
				console.log(`failed to connect to ${relay.url}`);
			});
		}
	});
</script>
