<script lang="ts">
	import { myNpubHex } from '$lib/data/const';
	import Profile from './Profile.svelte';
</script>

<div>
	<h1>Nostr Client</h1>

	<Profile npubHex={myNpubHex} imageOnly={true} />
</div>
