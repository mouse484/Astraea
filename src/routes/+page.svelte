<script lang="ts">
	import Profile from '$lib/components/Profile.svelte';
	import Relay from '$lib/components/Relay.svelte';
	import TimeLine from '../lib/components/TimeLine.svelte';
	import type { Relay as NostrRelay } from 'nostr-tools';

	const myPublicKey = 'npub1ecxns5jjwvaasnq7nnna0nd4wvacqgdmpvm5pjzdrpzcp06q863s0w23y6';
	let pubkey: string;

	const relays = ['wss://relay.damus.io', 'wss://relay.snort.social', 'wss://eden.nostr.land'];

	let relayPool: NostrRelay[] = [];

	$: pubkey = pubkey ? pubkey : myPublicKey;
</script>

<div>
	リレー: {relays}
</div>
<input type="text" bind:value={pubkey} />

<Relay {relays} on:relay={(event) => (relayPool = [...relayPool, event.detail])} />

{#key pubkey && relayPool}
	<Profile {pubkey} {relayPool} />
	<TimeLine {pubkey} {relayPool} />
{/key}

<style>
	input {
		width: 100%;
	}
</style>
