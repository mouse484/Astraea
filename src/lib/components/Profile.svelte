<script lang="ts">
	import { nip19 } from 'nostr-tools';
	import type { Event as relayEvent, Relay } from 'nostr-tools';

	const npubToHexId = (npub: string) => {
		const { data: userId } = nip19.decode(npub);
		return userId as string;
	};

	export let pubkey: string;
	export let relayPool: Relay[];

	type ProfileData = Partial<{ name: string; username: string; picture: string }>;

	let profile: ProfileData;

	relayPool.forEach((relay) => {
		const sub = relay.sub([{ authors: [npubToHexId(pubkey)], kinds: [0] }]);
		sub.on('event', (event: relayEvent) => {
			profile = JSON.parse(event.content) as ProfileData; // ちゃんとパースする zod
		});
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
