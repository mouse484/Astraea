<script lang="ts">
	import { beforeNavigate, goto } from '$app/navigation';
	import Icon from '@iconify/svelte';
	import { matchMedia } from '../elements/Responsive.svelte';
	import Notifications from './Notifications.svelte';

	let isNoticeOpen = false;

	const onClick = () => {
		if (matchMedia('md')) {
			isNoticeOpen = !isNoticeOpen;
		} else {
			goto('/notifications');
		}
	};

	beforeNavigate(() => {
		isNoticeOpen = false;
	});
</script>

<div class="relative">
	<button class="text-3xl" on:click={onClick}>
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
