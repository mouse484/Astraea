export const prerender = false;

import { fetchProfile, useNDK } from '$lib/stores/nostr.svelte';
import type { PageLoad } from './$types';

export const load: PageLoad = async ({ params }) => {
	const ndk = useNDK();
	const user = ndk.getUser({ pubkey: params.pubkey });
	const profile = await fetchProfile(user);
	const isNip05Valid = profile.nip05 && (await user.validateNip05(profile.nip05));
	return {
		user,
		profile,
		isNip05Valid,
		follows: await user.follows()
	};
};
