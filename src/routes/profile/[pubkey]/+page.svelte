<script lang="ts">
	import Profile from '$lib/components/Profile/Profile.svelte';
	import TimeLine from '$lib/components/TimeLine/TimeLine.svelte';
	import { useRelays } from '$lib/nostr/relays';
	import type { PageData } from './$types';

	export let data: PageData;

	const readRelays = useRelays('read');
</script>

{#key data}
	<div>
		<TimeLine relays={readRelays} authors={[data.pubkey]}>
			<Profile pubkey={data.pubkey} detail={true} />
		</TimeLine>
	</div>
{/key}
