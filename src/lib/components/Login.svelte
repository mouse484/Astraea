<script lang="ts">
	import { browser } from '$app/environment';
	import { pubkey } from '$lib/store/pubkey';
	import { _ } from 'svelte-i18n';
	import Heading from './elements/Heading.svelte';
	import { decode } from '$lib/nostr/nip19';

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
		const decoded = decode('npub', inputPubkey);
		if (decoded) {
			pubkey.set(decoded);
		} else {
			pubkeyInfo = $_('login.errorMessage');
		}
	};

	const nip07Login = async () => {
		if (!window.nostr) return;
		const nip07key = await window.nostr.getPublicKey();
		pubkey.set(nip07key);
	};
</script>

<Heading>
	{$_('login.login')}
</Heading>

<div class="flex flex-col gap-4 justify-center mt-4">
	<input
		class="p-2 w-full rounded border border-black"
		type="text"
		bind:value={inputPubkey}
		placeholder="npub key"
	/>
	<button on:click={savePubkey} class="btn" disabled={!inputPubkey}>
		{$_('login.login')}
	</button>

	<p class="text-center">or</p>

	<button disabled={!isNip07} class="btn" on:click={nip07Login}>
		{$_('login.nip07')}
	</button>

	{#if pubkeyInfo}
		<div>
			<p>{pubkeyInfo}</p>
		</div>
	{/if}
</div>
