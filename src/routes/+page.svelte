<script lang="ts">
	import Profile from '$lib/components/Profile.svelte';
	import TimeLine from '../lib/components/TimeLine.svelte';
	import { relays, relayPool } from '$lib/data/relay';

	const myPublicKey = 'npub1ecxns5jjwvaasnq7nnna0nd4wvacqgdmpvm5pjzdrpzcp06q863s0w23y6';
	let pubkey: string;

	$: pubkey = pubkey ? pubkey : myPublicKey;

	$: console.log($relays);
</script>

<div>
	リレー: {$relays}
</div>
<input type="text" bind:value={pubkey} />

{#key pubkey && $relayPool}
	<Profile {pubkey} relayPool={$relayPool} />
	<TimeLine {pubkey} relayPool={$relayPool} />
{/key}

<style>
	input {
		width: 100%;
	}
</style>
