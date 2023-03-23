<script lang="ts">
	import { pubkey } from '$lib/store/setting';
	import Icon from '@iconify/svelte';
	import Profile from './Profile/Profile.svelte';
</script>

<div
	class="flex fixed bottom-0 z-50 gap-4 justify-around items-center p-2 w-full text-3xl bg-white border"
>
	<a href="/">
		<Icon icon="mdi:home-outline" />
	</a>
	<a href="/search">
		<Icon icon="mdi:search" />
	</a>
	<a href="/notifications">
		<Icon icon="mdi:bell-outline" />
	</a>
	<Profile pubkey={$pubkey} imageOnly={true} />
</div>
