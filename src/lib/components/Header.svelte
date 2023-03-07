<script lang="ts">
	import { myNpubHex } from '$lib/data/const';
	import Profile from './Profile.svelte';
</script>

<header>
	<h1 class="text-2xl">Nostr Client</h1>

	<Profile npubHex={myNpubHex} imageOnly={true} />
</header>
