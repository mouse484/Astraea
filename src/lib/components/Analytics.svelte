<script lang="ts">
	import { dev } from '$app/environment';
</script>

<svelte:head>
	{#if !dev}
		<script
			async
			src="/stats/script.js"
			data-website-id="ab4e6af7-d2cb-4590-bd1b-8ad6878eee38"
		></script>
	{/if}
</svelte:head>
