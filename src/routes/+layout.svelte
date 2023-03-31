<script lang="ts">
	import { pwaInfo } from 'virtual:pwa-info';
	import { onMount } from 'svelte';
	import RegisterSw from '$lib/RegisterSW.svelte';

	let mounted = false;
	onMount(() => {
		mounted = true;
	});

	$: webManifest = pwaInfo ? pwaInfo.webManifest.linkTag : '';
</script>

<svelte:head>
	{@html webManifest}
</svelte:head>

<main>
	<slot />
</main>

{#if mounted && pwaInfo}
	<RegisterSw />
{/if}
