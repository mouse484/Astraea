import { user } from '$lib/stores/user.svelte';
import NDK, { NDKUser, type NDKUserProfile } from '@nostr-dev-kit/ndk';

export const setLoginUser = async (ndk: NDK) => {
	const nip08user = await ndk.signer?.user();
	if (nip08user) {
		user.setPubkey(nip08user.pubkey);
	}
};

export const fetchProfile = async (user: NDKUser) => {
	const profile = (await user.fetchProfile()) as Record<string, unknown>;
	if ('profile' in profile) {
		return profile.profile as NDKUserProfile;
	} else {
		return profile as NDKUserProfile;
	}
};
