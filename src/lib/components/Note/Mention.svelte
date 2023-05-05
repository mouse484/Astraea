<script lang="ts">
	import { useRelays } from '$lib/nostr/relays';
	import { profileQuery } from '$lib/query/profile';
	import Link from '../elements/Link.svelte';

	export let pubkey: string;

	const query = profileQuery(pubkey, useRelays('read'));
</script>

<Link href="/profile/{pubkey}">@{$query.data.name}</Link>
