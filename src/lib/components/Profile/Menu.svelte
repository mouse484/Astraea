<script lang="ts">
	import Icon from '@iconify/svelte';
	import { nip19 } from 'nostr-tools';
	import { _ } from 'svelte-i18n';
	import CopyButton from '../CopyButton.svelte';

	export let pubkey: string;

	let isMenuOpen = false;

	$: npub = nip19.npubEncode(pubkey);
</script>

<div class="relative">
	<button on:click={() => (isMenuOpen = !isMenuOpen)}>
		<Icon icon="mdi:menu" />
	</button>
	{#if isMenuOpen}
		<div
			class="flex absolute right-0 z-30 flex-col gap-2 p-4 mt-4 w-max bg-white rounded border"
		>
			<CopyButton content={npub}>{$_('profile.copyId')} (npub)</CopyButton>
			<CopyButton content={pubkey}>
				{$_('profile.copyId')} (hex)
			</CopyButton>
		</div>
	{/if}
</div>
