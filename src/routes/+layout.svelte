<script lang="ts">
	import RegisterSw from '$lib/RegisterSW.svelte';
	import Analytics from '$lib/components/Analytics.svelte';
	import Footer from '$lib/components/Menu/Footer.svelte';
	import Header from '$lib/components/Menu/Header.svelte';
	import SideMenu from '$lib/components/Menu/SideMenu.svelte';
	import Trend from '$lib/components/Trend.svelte';
	import Responsive from '$lib/components/elements/Responsive.svelte';
	import { name } from '$lib/data/const';
	import { QueryClientProvider } from '@tanstack/svelte-query';
	import { onMount } from 'svelte';
	import { pwaInfo } from 'virtual:pwa-info';
	import '../app.postcss';
	import type { LayoutData } from './$types';

	export let data: LayoutData;

	let mounted = false;

	onMount(() => {
		mounted = true;
	});

	$: webManifest = pwaInfo ? pwaInfo.webManifest.linkTag : '';
</script>

<Analytics />

<svelte:head>
	<title>{name}</title>
	{@html webManifest}
</svelte:head>

<main class="overflow-x-auto overflow-y-hidden h-screen break-all bg-base-100">
	{#if mounted}
		<QueryClientProvider client={data.queryClient}>
			<Responsive breakpoint="sm" than="less">
				<Header />
			</Responsive>
			<div class="gap-4 justify-between mx-8 md:flex">
				<Responsive breakpoint="md">
					<SideMenu />
				</Responsive>
				<div class="h-screen w-full">
					<slot />
				</div>
				<Responsive breakpoint="md">
					<div>
						<Trend />
					</div>
				</Responsive>
			</div>
			<Responsive breakpoint="sm" than="less">
				<Footer />
			</Responsive>
		</QueryClientProvider>
	{/if}
</main>

{#if mounted && pwaInfo}
	<RegisterSw />
{/if}
