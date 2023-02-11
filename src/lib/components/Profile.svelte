<script lang="ts">
	import { relayPool, relays } from '$lib/data/relay';
	import { npubToHexId } from '$lib/utils/key';
	import type { Event as relayEvent, Relay } from 'nostr-tools';
	import { subscribe } from 'svelte/internal';
	import { onMount } from 'svelte';

	export let pubkey: string;

	type ProfileData = Partial<{
		name: string;
		username: string;
		picture: string;
	}>;

	let profile: ProfileData;
	let contacts: ([string, string] | string)[] = [];

	onMount(() => {
		const subs = $relayPool.sub($relays, [
			{ authors: [npubToHexId(pubkey) || ''], kinds: [0, 3] }
		]);
		subs.on('event', (event: relayEvent) => {
			switch (event.kind) {
				case 0:
					profile = {
						...profile,
						...(JSON.parse(event.content) as ProfileData)
					};
				case 3:
					const tags = event.tags as [string, string][];
					contacts = [...contacts, ...tags];
			}
		});
		subs.on('eose', () => {
			subs.unsub();

			contacts = [...new Set(contacts.map(([_, id]) => id))];
		});
	});
</script>

{#if profile}
	<div class="profile">
		<img src={profile.picture} alt={profile.name} />
		<div>{profile.name}@{profile.username}</div>
		<div>follow: {contacts?.length}</div>
	</div>
{/if}

<style>
	.profile {
		display: flex;
		gap: 2rem;
	}
	img {
		width: 4rem;
		height: 4rem;
	}
</style>
