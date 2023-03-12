<script lang="ts">
	import '../app.css';
	import Header from '$lib/components/Header.svelte';
	import { pubkey } from '$lib/data/setting';
	import { browser } from '$app/environment';
	import Login from '$lib/components/Login.svelte';

	if (browser) {
		const localPubkey = localStorage.getItem('pubkey');
		if (localPubkey) pubkey.set(localPubkey);
	}
</script>

<svelte:head>
	<title>Astraea</title>
</svelte:head>

<div class="m-4">
	<Header />
	<section class="m-4">
		{#if $pubkey}
			<slot />
		{:else}
			<Login />
		{/if}
	</section>
</div>
