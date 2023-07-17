<script lang="ts">
	import { pubkey } from '$lib/store/pubkey';
	import LoginButton from '../common/LoginButton.svelte';
	import MenuLink from './MenuLink.svelte';
</script>

<div class="flex fixed bottom-0 z-40 gap-4 justify-between px-8 py-4 w-screen bg-base-100 border-t">
	<MenuLink href="/" iconName="home-outline" />
	<MenuLink href="/search" iconName="search" />
	<MenuLink href="/trend" iconName="trending-up" />
	<MenuLink href="/notifications" iconName="bell-outline" />
	{#if $pubkey}
		<MenuLink href="/profile/{$pubkey}" iconName="__profile__" />
	{:else}
		<LoginButton />
	{/if}
</div>
