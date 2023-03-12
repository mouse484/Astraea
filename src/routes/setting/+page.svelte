<script lang="ts">
	import { pubkey, relays } from '$lib/data/setting';
</script>

<div>
	<a href="/profile/{$pubkey}">Go Profile</a>
</div>

<h3 class="mt-8">Relays</h3>
{#each $relays as relay}
	<p>{relay}</p>
{/each}
