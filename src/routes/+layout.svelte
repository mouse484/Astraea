<script lang="ts">
	import '../app.postcss';
	import { pwaInfo } from 'virtual:pwa-info';
	import { onMount } from 'svelte';
	import RegisterSw from '$lib/RegisterSW.svelte';
	import { i18nInit } from '$lib/utils/i18n';
	import { pubkey } from '$lib/store/pubkey';
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
	{#if $pubkey}
		<slot />
	{:else}
		<Login />
	{/if}
</main>

{#if mounted && pwaInfo}
	<RegisterSw />
{/if}
