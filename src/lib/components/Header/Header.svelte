<script context="module" lang="ts">
	declare let APP_VERSION: string;
</script>

<script lang="ts">
	import Icon from '@iconify/svelte';
	const version = APP_VERSION;
</script>

<header class="m-8 flex justify-between items-center">
	<div class="flex gap-2">
		<h1 class="text-3xl">
			<a class="text-inherit visited:text-inherit" href="/">Astraea</a>
		</h1>
		{#if version}
			<p class="text-sm">v{version}</p>
		{/if}
	</div>

	<div class="flex gap-4">
		<a href="/setting">
			<Icon icon={'mdi:cog'} class="text-3xl" />
		</a>
	</div>
</header>
