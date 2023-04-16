<script context="module" lang="ts">
	declare let APP_VERSION: string;
</script>

<script lang="ts">
	const version = APP_VERSION;
</script>

<div class="flex gap-2">
	<h1 class="text-3xl">
		<a class="text-inherit visited:text-inherit" href="/">Astraea</a>
	</h1>
	{#if version}
		<p class="text-sm">v{version}</p>
	{/if}
</div>
