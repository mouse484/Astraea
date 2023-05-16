<script lang="ts">
	import { pubkey } from '$lib/store/pubkey';
	import { _ } from 'svelte-i18n';
	import Title from './Title.svelte';
	import MenuLink from './MenuLink.svelte';
</script>

<div class="flex float-right sticky top-0 flex-col gap-4 py-8 min-w-max h-screen">
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
		<MenuLink href="/profile/{$pubkey}" iconName="__profile__">
			{$_('profile.profile')}
		</MenuLink>
	</div>
</div>
