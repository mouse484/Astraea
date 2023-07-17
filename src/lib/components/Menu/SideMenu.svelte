<script lang="ts">
	import { pubkey } from '$lib/store/pubkey';
	import { _ } from 'svelte-i18n';
	import LoginButton from '../common/LoginButton.svelte';
	import MenuLink from './MenuLink.svelte';
	import Title from './Title.svelte';
</script>

<div class="sticky top-0 h-screen">
	<div class="flex flex-col gap-4 py-8 min-w-max h-full">
		<div class="mb-8">
			<Title />
		</div>
		<MenuLink href="/" iconName="home-outline">
			{$_('home.home')}
		</MenuLink>
		<MenuLink href="/search" iconName="search">
			{$_('search.search')}
		</MenuLink>
		<MenuLink href="/notifications" iconName="bell-outline">
			{$_('notifications.notifications')}
		</MenuLink>
		<MenuLink href="/setting" iconName="cog">
			{$_('setting.setting')}
		</MenuLink>
		<div class="mt-auto">
			{#if $pubkey}
				<MenuLink href="/profile/{$pubkey}" iconName="__profile__">
					{$_('profile.profile')}
				</MenuLink>
			{:else}
				<LoginButton />
			{/if}
		</div>
	</div>
</div>
