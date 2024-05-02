<script context="module" lang="ts">
	declare let APP_VERSION: string;
</script>

<script lang="ts">
	import i18next from 'i18next';

	import MenuLink from './MenuLink.svelte';

	const version = APP_VERSION;
</script>

<nav>
	<div class="flex gap-2">
		<h1 class="text-3xl">Astraea</h1>
		<p class="text-sm text-gray">v{version}</p>
	</div>
	<ul class="mt-16">
		<li>
			<MenuLink href="/" icon="home">
				{i18next.t('home.home')}
			</MenuLink>
		</li>
	</ul>
</nav>
