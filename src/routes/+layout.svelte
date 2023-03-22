<script lang="ts">
	import '../app.css';
	import Header from '$lib/components/Header.svelte';
	import { pubkey } from '$lib/store/setting';
	import { browser } from '$app/environment';
	import Login from '$lib/components/Login.svelte';
	import { onMount } from 'svelte';
	import { pwaInfo } from 'virtual:pwa-info';

	let mounted = false;
	if (browser) {
		const localPubkey = localStorage.getItem('pubkey');
		if (localPubkey) pubkey.set(localPubkey);
	}

	onMount(async () => {
		mounted = true;
		if (pwaInfo) {
			const { registerSW } = await import('virtual:pwa-register');
			registerSW({
				immediate: true,
				onRegistered(r: unknown) {
					// uncomment following code if you want check for updates
					// r && setInterval(() => {
					//    console.log('Checking for sw update')
					//    r.update()
					// }, 20000 /* 20s for testing purposes */)
					console.log(`SW Registered: ${r}`);
				},
				onRegisterError(error: unknown) {
					console.log('SW registration error', error);
				}
			});
		}
	});

	$: webManifest = pwaInfo ? pwaInfo.webManifest.linkTag : '';
</script>

<svelte:head>
	<title>Astraea</title>
	{@html webManifest}
</svelte:head>

<div class="m-4">
	<Header />
	<section class="m-4">
		{#if mounted}
			{#if $pubkey}
				<slot />
			{:else}
				<Login />
			{/if}
		{/if}
	</section>
</div>
