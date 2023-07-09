<script lang="ts">
	import Main from '$lib/components/Main.svelte';
	import Profile from '$lib/components/Profile/Profile.svelte';
	import TimeLine from '$lib/components/TimeLine/TimeLine.svelte';
	import { useRelays } from '$lib/nostr/relays';
	import { _ } from 'svelte-i18n';
	import type { PageData } from './$types';

	export let data: PageData;

	const readRelays = useRelays('read');
</script>

{#key data}
	<!-- タイトルに名前含めたい -->
	<Main title={$_('profile.profile')}>
		<TimeLine relays={readRelays} authors={[data.pubkey]}>
			<Profile pubkey={data.pubkey} detail={true} />
		</TimeLine>
	</Main>
{/key}
