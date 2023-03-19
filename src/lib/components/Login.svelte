<script lang="ts">
	import { browser } from '$app/environment';
	import { pubkey } from '$lib/store/setting';
	import { nip19 } from 'nostr-tools';
	import Button from './elements/Button.svelte';
	let inputPubkey: string;
	let pubkeyInfo: string;

	let isNip07: boolean;

	if (browser) {
		if (window.nostr) {
			isNip07 = true;
		} else {
			isNip07 = false;
		}
	}

	const savePubkey = () => {
		try {
			const decode = nip19.decode(inputPubkey);
			if (decode.type === 'npub') {
				// 後で直す
				pubkey.set(decode.data as string);
			}
		} catch {
			pubkeyInfo = 'pubkeyが間違っているか、問題が発生しました。';
		}
	};

	const nip07Login = async () => {
		if (!window.nostr) return;
		const nip07key = await window.nostr.getPublicKey();
		pubkey.set(nip07key);
	};
</script>

<h2 class="text-2xl">Login</h2>

<div class="flex flex-col gap-4 justify-center mt-4">
	<input
		class="p-2 w-full rounded border border-black"
		type="text"
		bind:value={inputPubkey}
		placeholder="npub key"
	/>
	<Button on:click={savePubkey} disabled={!inputPubkey}>Login</Button>
	{#key pubkeyInfo}
		{#if pubkeyInfo}
			<p>{pubkeyInfo}</p>
		{/if}
	{/key}
	<p class="text-center">or</p>
	<Button disabled={!isNip07} on:click={nip07Login}>nip-07拡張機能</Button>
</div>
