<script lang="ts">
	import Icon from '@iconify/svelte';
	import { nip19 } from 'nostr-tools';
	import CopyButton from '../CopyButton.svelte';

	export let npubHex: string;

	let isMenuOpen = false;

	$: npub = nip19.npubEncode(npubHex);
</script>

<div class="relative">
	<button on:click={() => (isMenuOpen = !isMenuOpen)}>
		<Icon icon="mdi:menu" />
	</button>
	{#if isMenuOpen}
		<div
			class="flex absolute right-0 z-30 flex-col gap-2 p-4 mt-4 w-max bg-white rounded border"
		>
			<CopyButton content={npubHex}>ユーザーIDをコピー(pubkey)</CopyButton>
			<CopyButton content={npub}>ユーザーIDをコピー(hex)</CopyButton>
		</div>
	{/if}
</div>
