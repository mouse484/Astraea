<script lang="ts">
	import Icon from '@iconify/svelte';
	import CopyButton from '../CopyButton.svelte';

	let isMenuOpen = false;
</script>

<div class="relative">
	<button on:click={() => (isMenuOpen = !isMenuOpen)}>
		<Icon icon="mdi:menu" />
	</button>
	{#if isMenuOpen}
		<div class="absolute right-0 z-50 p-2 rounded border bg-inherit">
			<!-- <CopyButton>ユーザーIDをコピー(pubkey)</CopyButton> -->
			<!-- <CopyButton>ユーザーIDをコピー(hex)</CopyButton> -->
		</div>
	{/if}
</div>
