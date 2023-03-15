<script lang="ts">
	import Icon from '@iconify/svelte';
	import Notifications from './Notifications.svelte';

	let isNoticeOpen = false;
</script>

<div class="relative">
	<button on:click={() => (isNoticeOpen = !isNoticeOpen)}>
		{#if isNoticeOpen}
			<Icon icon={'mdi:bell'} />
		{:else}
			<Icon icon={'mdi:bell-outline'} />
		{/if}
	</button>
	{#if isNoticeOpen}
		<div class="absolute right-0 z-50 p-4 mt-4 w-96 bg-white rounded border">
			<Notifications />
		</div>
	{/if}
</div>
