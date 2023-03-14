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
			class="flex absolute right-0 z-50 flex-col p-2 w-max rounded border bg-inherit"
		>
			<CopyButton content={npubHex}>ユーザーIDをコピー(pubkey)</CopyButton>
			<CopyButton content={npub}>ユーザーIDをコピー(hex)</CopyButton>
		</div>
	{/if}
</div>
