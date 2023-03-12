<script lang="ts">
	import { goto } from '$app/navigation';
	import Button from '$lib/components/elements/Button.svelte';
	import { pubkey, pubkeyClear, relays } from '$lib/data/setting';

	const logout = () => {
		pubkeyClear();
		goto('/');
	};
</script>

<div>
	<a href="/profile/{$pubkey}">Go Profile</a>
</div>

<h3 class="mt-8">Relays</h3>
{#each $relays as relay}
	<p>{relay}</p>
{/each}

<div>
	<h3 class="text-2xl mt-4">ログアウト</h3>
	<div class="mt-4">
		<Button on:click={logout}>Logout</Button>
	</div>
</div>
