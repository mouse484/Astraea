<script lang="ts">
	import { pubkey } from '$lib/data/setting';
	import Profile from './Profile.svelte';
</script>

<header class="flex justify-between">
	<h1 class="text-2xl">
		<a class="text-inherit visited:text-inherit" href="/">Astraea</a>
	</h1>

	<div class="flex h-12">
		{#key $pubkey}
			<Profile npubHex={$pubkey} imageOnly={true} to={'/setting'} />
		{/key}
	</div>
</header>
