<script lang="ts">
	import '../app.css';
	import Header from '$lib/components/Header.svelte';
	import { pubkey } from '$lib/store/setting';
	import { browser } from '$app/environment';
	import Login from '$lib/components/Login.svelte';
	import { onMount } from 'svelte';
	let mounted = false;
	if (browser) {
		const localPubkey = localStorage.getItem('pubkey');
		if (localPubkey) pubkey.set(localPubkey);
	}
	onMount(() => {
		mounted = true;
	});
</script>

<svelte:head>
	<title>Astraea</title>
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
