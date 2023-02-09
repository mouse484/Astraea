<script lang="ts">
	import { onMount } from 'svelte';
	import { nip19, relayInit } from 'nostr-tools';
	import type { Event as relayEvent } from 'nostr-tools';

	const npubToHexId = (npub: string) => {
		const { data: userId } = nip19.decode(npub);
		return userId as string;
	};

	export let pubkey: string;
	export let relays: string[];

	type ProfileData = Partial<{ name: string; username: string; picture: string }>;

	let profile: ProfileData;

	onMount(async () => {
		for (const url of relays) {
			let relay = relayInit(url);
			await relay.connect();
			relay.on('connect', () => {
				console.log(`connected to ${relay.url}`);
			});
			relay.on('error', () => {
				console.log(`failed to connect to ${relay.url}`);
			});

			const sub = relay.sub([{ authors: [npubToHexId(pubkey)], kinds: [0] }]);
			sub.on('event', (event: relayEvent) => {
				profile = JSON.parse(event.content) as ProfileData; // ちゃんとパースする zod
			});
		}
	});
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
