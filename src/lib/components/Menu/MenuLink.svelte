<script lang="ts">
	import { pubkey } from '$lib/store/pubkey';
	import Profile from '../Profile/Profile.svelte';
	import Icon from '../elements/Icon.svelte';

	export let href: string;
	export let iconName: string;
</script>

<a {href} class="flex gap-2 items-center">
	{#if iconName === '__profile__'}
		<Profile pubkey={$pubkey} imageOnly={true} imageSize="s" />
	{:else}
		<Icon name={iconName} size={'2'} />
	{/if}
	<slot />
</a>
