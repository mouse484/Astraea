<script lang="ts">
	import RelayList from '$lib/components/Relay/RelayList.svelte';
	import { contactsRelayScheme } from '$lib/scheme/relays';
	import { nostr } from '$lib/stores/nostr.svelte';
	import { userStore } from '$lib/stores/user.svelte';
	import { setUserRelay } from '$lib/utils/ndk';
	import { NDKKind } from '@nostr-dev-kit/ndk';
	import { parse } from 'valibot';

	const { ndk } = nostr;

	const importRelays = async () => {
		const event = await ndk.fetchEvent({
			kinds: [NDKKind.Contacts],
			authors: [userStore().pubkey!]
		});
		const parsed = parse(contactsRelayScheme, JSON.parse(event?.content ?? ''));
		const relays = Object.keys(parsed);

		setUserRelay(ndk, relays);

		localStorage.setItem('relays', JSON.stringify(relays));
	};
</script>

<div class="mt-8">
	<button onclick={importRelays} class="border-(1 accent) rounded-md bg-transparent p-2">
		Import Relays (kind:3)
	</button>

	<section class="mt-16">
		<RelayList {ndk} />
	</section>
</div>
