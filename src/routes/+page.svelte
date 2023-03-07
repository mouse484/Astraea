<script lang="ts">
	import Profile from '$lib/components/Profile.svelte';
	import TimeLine from '$lib/components/timeline/TimeLine.svelte';
	import { contacts } from '$lib/data/profile';
	import { decodeKey } from '$lib/utils/key';
	import { relayPool } from '$lib/utils/relay';
	import { onMount } from 'svelte';
	import { inputClass, mainClass } from './page.css';

	const myPublicKey =
		'npub1ecxns5jjwvaasnq7nnna0nd4wvacqgdmpvm5pjzdrpzcp06q863s0w23y6';
	let pubkey: string;

	$: npubHex = decodeKey('npub', pubkey || myPublicKey);

	$: authors = $contacts.map(([, id]) => id);

	onMount(() => {
		if (npubHex) {
			relayPool.subscribe(3, { authors: [npubHex] }).on((event) => {
				const tags = event.tags as [string, string][];
				contacts.update((updater) =>
					updater.length < tags.length ? tags : updater
				);
			});
		}
	});
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
{/if}

<section class={mainClass}>
	{#key authors}
		<TimeLine {authors} time={'10min'} />
	{/key}
</section>
