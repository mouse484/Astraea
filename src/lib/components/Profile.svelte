<script lang="ts">
	import { relayPool, relays } from '$lib/data/relay';
	import { npubToHexId } from '$lib/utils/key';
	import type { Event as relayEvent, Relay } from 'nostr-tools';
	import { subscribe } from 'svelte/internal';

	export let pubkey: string;

	type ProfileData = Partial<{
		name: string;
		username: string;
		picture: string;
	}>;

	let profile: ProfileData;

	if ($relayPool) {
		const subs = $relayPool.sub($relays, [
			{ authors: [npubToHexId(pubkey)], kinds: [0] }
		]);
		subs.on('event', (event: relayEvent) => {
			profile = JSON.parse(event.content) as ProfileData; // ちゃんとパースする zod
		});
		subs.on('eose', () => subs.unsub());
	}
</script>

{#if profile}
	<div class="profile">
		<img src={profile.picture} alt={profile.name} />
		<div>{profile.name}@{profile.username}</div>
	</div>
{/if}

<style>
	.profile {
		display: flex;
	}
	img {
		width: 4rem;
		height: 4rem;
	}
</style>
