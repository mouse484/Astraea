<script lang="ts">
	import { goto } from '$app/navigation';
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
	<h3 class="text-2xl mt-4">LogOut</h3>
	<button on:click={logout}>Logout</button>
</div>
