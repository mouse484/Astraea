<script lang="ts">
	import Profile from '$lib/components/Profile.svelte';
	import TimeLine from '../lib/components/TimeLine.svelte';

	const myPublicKey = 'npub1ecxns5jjwvaasnq7nnna0nd4wvacqgdmpvm5pjzdrpzcp06q863s0w23y6';
	let pubkey: string;

	const relays = ['wss://relay.damus.io', 'wss://eden.nostr.land'];

	$: pubkey = pubkey ? pubkey : myPublicKey;
</script>

<div>
	リレー: {relays}
</div>
<input type="text" bind:value={pubkey} />

{#key pubkey}
	<Profile {pubkey} {relays} />
	<TimeLine {pubkey} {relays} />
{/key}

<style>
	input {
		width: 100%;
	}
</style>
