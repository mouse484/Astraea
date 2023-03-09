<script lang="ts">
	import { pubkey, relays } from '$lib/data/setting';
	import { nip19 } from 'nostr-tools';

	let inputPubkey: string;
	let pubkeyInfo: string;

	const savePubkey = () => {
		try {
			const decode = nip19.decode(inputPubkey);
			if (decode.type === 'npub') {
				// 後で直す
				pubkey.set(decode.data as string);
				pubkeyInfo =
					'pubkeyを保存しました、プロフィールリンクから確認できます。';
			}
		} catch {
			pubkeyInfo = 'pubkeyが間違っているか、問題が発生しました。';
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
		<button
			class="px-2 ml-2 rounded border bg-slate-200"
			on:click={savePubkey}
			disabled={!inputPubkey}
		>
			save
		</button>
	</div>

	{#key pubkeyInfo}
		{#if pubkeyInfo}
			<p>{pubkeyInfo}</p>
		{/if}
	{/key}
</div>

<h3 class="mt-8">Relays</h3>
{#each $relays as relay}
	<p>{relay}</p>
{/each}
