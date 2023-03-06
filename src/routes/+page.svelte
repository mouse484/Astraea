<script lang="ts">
	import Contacts from '$lib/components/contacts.svelte';
	import Profile from '$lib/components/Profile.svelte';
	import TimeLine from '$lib/components/timeline/TimeLine.svelte';
	import { contacts } from '$lib/data/profile';
	import { decodeKey } from '$lib/utils/key';
	import { inputClass, mainClass } from './page.css';

	const myPublicKey =
		'npub1ecxns5jjwvaasnq7nnna0nd4wvacqgdmpvm5pjzdrpzcp06q863s0w23y6';
	let pubkey: string;

	$: npubHex = decodeKey('npub', pubkey || myPublicKey);
</script>

<!-- リレー表示一旦停止です -->
<!-- <div>
	リレー:
	{#each $relays as relay}
		<p>{relay}</p>
	{/each}
</div> -->
<input class={inputClass} type="text" bind:value={pubkey} />

{#if npubHex}
	<Profile {npubHex} />
	<!-- 仮 ↓ -->
	<Contacts {npubHex} />
{/if}

<section class={mainClass}>
	<!-- ここ直したい -->
	{#key $contacts}
		<TimeLine />
	{/key}
</section>
