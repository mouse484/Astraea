<script lang="ts">
	import Profile from '$lib/components/Profile/Profile.svelte';
	import TimeLine from '$lib/components/TimeLine/TimeLine.svelte';
	import { useRelays } from '$lib/nostr/relays';
	import type { PageData } from './$types';

	export let data: PageData;

	const readRelays = useRelays('read');
</script>

<div>
	<Profile pubkey={data.pubkey} detail={true} />

	<div class="mt-8">
		<TimeLine relays={readRelays} authors={[data.pubkey]} />
	</div>
</div>
