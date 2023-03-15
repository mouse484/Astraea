<script context="module" lang="ts">
	declare let APP_VERSION: string;
</script>

<script lang="ts">
	import { pubkey } from '$lib/data/setting';
	import NotificationHeader from './Notifications/NotificationHeader.svelte';
	import Profile from './Profile/Profile.svelte';
	const version = APP_VERSION;
</script>

<header class="flex justify-between">
	<div class="flex gap-2">
		<h1 class="text-2xl">
			<a class="text-inherit visited:text-inherit" href="/">Astraea</a>
		</h1>
		{#if version}
			<p class="text-sm">v{version}</p>
		{/if}
	</div>

	<div class="flex gap-4 items-center h-12 text-2xl">
		<NotificationHeader />
		{#key $pubkey}
			<Profile npubHex={$pubkey} imageOnly={true} to={'/setting'} />
		{/key}
	</div>
</header>
