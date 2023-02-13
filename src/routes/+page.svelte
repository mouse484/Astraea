<script lang="ts">
	import { goto } from '$app/navigation';
	import Profile from '$lib/components/Profile.svelte';
	import TimeLine from '$lib/components/timeline/TimeLine.svelte';
	import { relays, relayPool } from '$lib/data/relay';

	const myPublicKey =
		'npub1ecxns5jjwvaasnq7nnna0nd4wvacqgdmpvm5pjzdrpzcp06q863s0w23y6';
	let pubkey: string;

	$: pubkey = pubkey ? pubkey : myPublicKey;
</script>

<div>
	リレー: {$relays}
</div>
<input type="text" bind:value={pubkey} />

{#key pubkey && $relayPool}
	<Profile {pubkey} />

	<button on:click={() => goto(`/profile/${pubkey}`)}>go profile page</button>

	<TimeLine {pubkey} />
{/key}

<style>
	input {
		width: 100%;
	}
</style>
