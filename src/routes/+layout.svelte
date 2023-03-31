<script lang="ts">
	import '../app.postcss';
	import { pwaInfo } from 'virtual:pwa-info';
	import { onMount } from 'svelte';
	import RegisterSw from '$lib/RegisterSW.svelte';
	import { pubkey } from '$lib/store/pubkey';
	import Login from '$lib/components/Login.svelte';
	import { name } from '$lib/data/const';
	import Header from '$lib/components/Header/Header.svelte';
	import { QueryClientProvider } from '@tanstack/svelte-query';
	import type { LayoutData } from './$types';

	export let data: LayoutData;

	let mounted = false;

	onMount(() => {
		mounted = true;
	});

	$: webManifest = pwaInfo ? pwaInfo.webManifest.linkTag : '';
</script>

<svelte:head>
	<title>{name}</title>
	{@html webManifest}
</svelte:head>

<main>
	{#if mounted}
		{#if $pubkey}
			<QueryClientProvider client={data.queryClient}>
				<Header />
				<div class="m-4">
					<slot />
				</div>
			</QueryClientProvider>
		{:else}
			<Login />
		{/if}
	{/if}
</main>

{#if mounted && pwaInfo}
	<RegisterSw />
{/if}
