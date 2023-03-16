<script lang="ts">
	import { beforeNavigate, goto } from '$app/navigation';
	import { page } from '$app/stores';
	import Icon from '@iconify/svelte';
	import { matchMedia } from '../elements/Responsive.svelte';
	import Notifications from './Notifications.svelte';

	const notificationsPath = '/notifications';

	let isNoticeOpen = false;

	$: isNoticePage = $page.route.id === notificationsPath;

	const onClick = () => {
		if (matchMedia('md')) {
			isNoticeOpen = !isNoticeOpen;
		} else {
			if (isNoticePage) {
				goto('/');
			} else {
				goto(notificationsPath);
			}
		}
	};

	beforeNavigate(() => {
		isNoticeOpen = false;
	});
</script>

<div class="relative">
	<button class="text-3xl" on:click={onClick}>
		{#if isNoticeOpen || isNoticePage}
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
