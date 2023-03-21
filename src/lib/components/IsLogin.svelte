<script lang="ts">
	import { browser } from '$app/environment';
	import { usePubkey } from '$lib/store/setting';
	import Login from './Login.svelte';

	const pubkey = usePubkey();

	if (browser) {
	}
</script>

{#if $pubkey.data}
	<slot />
{:else}
	<Login />
{/if}
