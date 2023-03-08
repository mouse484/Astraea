<script lang="ts">
	import { pubkey, relays } from '$lib/data/setting';
	import { nip19 } from 'nostr-tools';

	let inputPubkey: string;

	const savePubkey = () => {
		const decode = nip19.decode(inputPubkey);
		if (decode.type === 'npub') {
			// 後で直す
			pubkey.set(decode.data as string);
		}
	};
</script>

<input type="text" bind:value={inputPubkey} placeholder="npub key" />
<button on:click={savePubkey}>save</button>

<h3>Relays</h3>
{#each $relays as relay}
	<p>{relay}</p>
{/each}
