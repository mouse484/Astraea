<script lang="ts">
	import { pubkey, relays } from '$lib/data/setting';
	import { nip19 } from 'nostr-tools';

	let inputPubkey: string = $pubkey;

	const savePubkey = () => {
		const decode = nip19.decode(inputPubkey);
		if (decode.type === 'npub') {
			// 後で直す
			pubkey.set(decode.data as string);
		}
	};
</script>

<div>
	<a href="/profile/{$pubkey}">Go Profile</a>
</div>

<div class="mt-4">
	<label for="npub">Npub key: </label>

	<div class="flex">
		<input
			class="mt-2 w-full rounded border border-black"
			type="text"
			bind:value={inputPubkey}
			placeholder="npub key"
		/>
		<button class="px-2 ml-2 rounded border bg-slate-200" on:click={savePubkey}>
			save
		</button>
	</div>
</div>

<h3 class="mt-8">Relays</h3>
{#each $relays as relay}
	<p>{relay}</p>
{/each}
