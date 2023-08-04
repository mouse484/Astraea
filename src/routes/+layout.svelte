<script lang="ts">
	import RegisterSw from '$lib/RegisterSW.svelte';
	import Analytics from '$lib/components/Analytics.svelte';
	import Footer from '$lib/components/Menu/Footer.svelte';
	import Header from '$lib/components/Menu/Header.svelte';
	import SideMenu from '$lib/components/Menu/SideMenu.svelte';
	import Theme from '$lib/components/Theme.svelte';
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
<Theme />

<svelte:head>
	<title>{name}</title>
	{@html webManifest}
</svelte:head>

<div class="h-screen overflow-clip break-all bg-base-100">
	{#if mounted}
		<QueryClientProvider client={data.queryClient}>
			<Responsive breakpoint="md" than="less">
				<Header />
			</Responsive>
			<div class="gap-4 justify-between mx-8 mb-24 md:flex md:mb-0">
				<Responsive breakpoint="md">
					<SideMenu />
				</Responsive>
				<slot />
				<Responsive breakpoint="md">
					<Trend head={true} />
				</Responsive>
			</div>
			<Responsive breakpoint="md" than="less">
				<Footer />
			</Responsive>
		</QueryClientProvider>
	{/if}
</div>

{#if mounted && pwaInfo}
	<RegisterSw />
{/if}
