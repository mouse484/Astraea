<script lang="ts">
	import '../app.postcss';
	import { pwaInfo } from 'virtual:pwa-info';
	import { onMount } from 'svelte';
	import RegisterSw from '$lib/RegisterSW.svelte';
	import { pubkey } from '$lib/store/pubkey';
	import Login from '$lib/components/Login.svelte';
	import { name } from '$lib/data/const';
	import Header from '$lib/components/Menu/Header.svelte';
	import { QueryClientProvider } from '@tanstack/svelte-query';
	import type { LayoutData } from './$types';
	import RelaysHandle from '$lib/components/RelaysHandle.svelte';
	import SideMenu from '$lib/components/Menu/SideMenu.svelte';
	import Responsive from '$lib/components/elements/Responsive.svelte';
	import Trend from '$lib/components/Trend.svelte';
	import Footer from '$lib/components/Menu/Footer.svelte';
	import { theme } from '$lib/store/theme';

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

<div class="{$theme}">
	<main class="min-h-screen break-all dark:bg-[#171717] dark:text-gray-300">
		{#if mounted}
			{#if $pubkey}
				<QueryClientProvider client={data.queryClient}>
					<Responsive breakpoint="sm" than="less">
						<Header />
					</Responsive>
					<div class="flex gap-4 justify-between mx-8">
						<Responsive breakpoint="md">
							<SideMenu />
						</Responsive>
						<RelaysHandle pubkey={$pubkey}>
							<div class="flex-grow">
								<slot />
							</div>
							<Responsive breakpoint="md">
								<div>
									<Trend />
								</div>
							</Responsive>
						</RelaysHandle>
					</div>
					<Responsive breakpoint="sm" than="less">
						<Footer />
					</Responsive>
				</QueryClientProvider>
			{:else}
				<Login />
			{/if}
		{/if}
	</main>
</div>

{#if mounted && pwaInfo}
	<RegisterSw />
{/if}
