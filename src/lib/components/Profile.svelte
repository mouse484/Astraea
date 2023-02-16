<script lang="ts">
	import { users, type ProfileData } from '$lib/data/profile';
	import { relayPool, relays } from '$lib/data/relay';
	import type { Event } from 'nostr-tools';
	import { npubEncode } from 'nostr-tools/nip19';
	import { onMount } from 'svelte';
	import {
		iconClass,
		nip05Class,
		profileClass,
		userNameClass
	} from './Profile.css';

	export let npubHex: string;

	let profile: ProfileData = $users.get(npubHex) || {
		name: 'loading',
		picture: ''
	};

	onMount(() => {
		const subs = $relayPool.sub($relays, [{ kinds: [0], authors: [npubHex] }]);
		subs.on('event', (event: Event) => {
			profile = {
				...profile,
				...(JSON.parse(event.content) as ProfileData)
			};
			users.update((updater) => updater.set(npubHex, profile));
		});
		subs.on('eose', () => {
			subs.unsub();
		});
	});
</script>

{#key profile}
	<div class={profileClass}>
		<img class={iconClass} src={profile.picture} alt={profile.name} />
		<div>
			<a href="/profile/{npubEncode(npubHex)}" class={userNameClass}>
				{profile.display_name || ''}
				{profile.name
					? profile.display_name
						? `@${profile.name}`
						: profile.name
					: ''}
			</a>
			<div class={nip05Class}>{profile.nip05 || ''}</div>
		</div>
	</div>
{/key}
