<script lang="ts">
	import { users, type ProfileData } from '$lib/data/profile';
	import { relayPool, relays } from '$lib/data/relay';
	import type { Event } from 'nostr-tools';
	import { onMount } from 'svelte';
	import {
		iconClass,
		nip05Class,
		profileClass,
		userNameClass
	} from './Profile.css';

	export let pubkey: string;

	let profile: ProfileData = {
		name: 'loading',
		picture: ''
	};

	onMount(() => {
		const userData = $users.get(pubkey);

		if (userData) return (profile = userData);

		const subs = $relayPool.sub($relays, [{ kinds: [0], authors: [pubkey] }]);
		subs.on('event', (event: Event) => {
			profile = {
				...profile,
				...(JSON.parse(event.content) as ProfileData)
			};
			users.update((updater) => updater.set(pubkey, profile));
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
			<div class={userNameClass}>
				{profile.display_name || ''}
				{profile.name
					? profile.display_name
						? `@${profile.name}`
						: profile.name
					: ''}
			</div>
			<div class={nip05Class}>{profile.nip05 || ''}</div>
		</div>
	</div>
{/key}
