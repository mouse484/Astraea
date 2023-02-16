<script lang="ts">
	import { contacts } from '$lib/data/profile';
	import { relayPool, relays } from '$lib/data/relay';
	import { decodeKey } from '$lib/utils/key';
	import type { Event as relayEvent } from 'nostr-tools';
	import { onMount } from 'svelte';

	export let pubkey: string;

	type ProfileData = Partial<{
		name: string;
		username: string;
		picture: string;
	}>;

	onMount(() => {
		const subs = $relayPool.sub($relays, [
			{ authors: [decodeKey('npub', pubkey) || ''], kinds: [3] }
		]);
		subs.on('event', (event: relayEvent) => {
			const tags = event.tags as [string, string][];
			contacts.update((updater) =>
				updater.length < tags.length ? tags : updater
			);
		});
		subs.on('eose', () => {
			subs.unsub();
		});
	});
</script>
