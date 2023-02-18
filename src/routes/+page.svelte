<script lang="ts">
	import Contacts from '$lib/components/contacts.svelte';
	import Profile from '$lib/components/Profile.svelte';
	import TimeLine from '$lib/components/timeline/TimeLine.svelte';
	import { contacts } from '$lib/data/profile';
	import { relayPool, relays } from '$lib/data/relay';
	import { decodeKey } from '$lib/utils/key';
	import { inputClass, mainClass } from './page.css';

	const myPublicKey =
		'npub1ecxns5jjwvaasnq7nnna0nd4wvacqgdmpvm5pjzdrpzcp06q863s0w23y6';
	let pubkey: string;

	$: pubkey = pubkey ? pubkey : myPublicKey;
	$: npubHex = decodeKey('npub', pubkey);
</script>

<div>
	リレー:
	{#each $relays as relay}
		<p>{relay}</p>
	{/each}
</div>
<input class={inputClass} type="text" bind:value={pubkey} />

{#if $relayPool}
	{#if npubHex}
		<Profile {npubHex} />
		<!-- 仮 ↓ -->
		<Contacts {pubkey} />
	{/if}

	<section class={mainClass}>
		<!-- ここ直したい -->
		{#key $contacts}
			<TimeLine />
		{/key}
	</section>
{/if}
