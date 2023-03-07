<script lang="ts">
	import { users, type ProfileData } from '$lib/data/profile';
	import { relayPool } from '$lib/utils/relay';
	import { nip19 } from 'nostr-tools';
	import { onMount } from 'svelte';
	import { get } from 'svelte/store';
	import {
		iconClass,
		nip05Class,
		profileClass,
		userNameClass
	} from './Profile.css';

	export let npubHex: string;

	let profile: ProfileData;

	const profileUpdater = async (usersMap: Map<string, ProfileData>) => {
		const p = usersMap.get(npubHex);
		if (p) {
			if (profile !== p) profile = p;
			return profile;
		} else {
			const event = await relayPool.get(0, {
				authors: [npubHex]
			});
			if (!event) return profile;
			const parsed = JSON.parse(event.content) as ProfileData;
			profile = parsed;
			return profile;
		}
	};
	onMount(() => {
		profileUpdater(get(users));
	});
</script>

{#key profile}
	<div class={profileClass}>
		<img class={iconClass} src={profile?.picture} alt={profile?.name} />
		<div>
			<a href="/profile/{nip19.npubEncode(npubHex)}" class={userNameClass}>
				{profile?.display_name || profile?.name}
			</a>
			<div class={nip05Class}>{profile?.nip05 || `@${profile?.name}`}</div>
		</div>
	</div>
{/key}
