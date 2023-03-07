<script lang="ts">
	import { myNpubHex } from '$lib/data/const';
	import Profile from './Profile.svelte';
</script>

<header class="flex justify-between">
	<h1 class="text-2xl">Nostr Client</h1>

	<div class="flex h-12">
		<Profile npubHex={myNpubHex} imageOnly={true} />
	</div>
</header>
