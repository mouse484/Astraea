<script lang="ts">
	import { pwaInfo } from 'virtual:pwa-info';
	import { onMount } from 'svelte';
	import RegisterSw from '$lib/RegisterSW.svelte';
	import { i18nInit } from '$lib/utils/i18n';
	import Login from '$lib/components/Login.svelte';

	let mounted = false;

	i18nInit();

	onMount(() => {
		mounted = true;
	});

	$: webManifest = pwaInfo ? pwaInfo.webManifest.linkTag : '';
</script>

<svelte:head>
	{@html webManifest}
</svelte:head>

<main>
	<Login />
	<slot />
</main>

{#if mounted && pwaInfo}
	<RegisterSw />
{/if}
