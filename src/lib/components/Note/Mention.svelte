<script lang="ts">
	import { useRelays } from '$lib/nostr/relays';
	import { profileQuery } from '$lib/query/profile';

	export let pubkey: string;

	const query = profileQuery(pubkey, useRelays('read'));
</script>

<a class="text-sky-400" href="/profile/{pubkey}">
	@{$query.data?.name || pubkey.substring(0, 10)}
</a>
