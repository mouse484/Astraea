import { userStore } from '$lib/stores/user.svelte';
import NDK, { NDKUser, type NDKUserProfile } from '@nostr-dev-kit/ndk';

export const init = async (ndk: NDK) => {
	const setLoginUser = async (ndk: NDK) => {
		const nip08user = await ndk.signer?.user();
		if (nip08user) {
			userStore().setPubkey(nip08user.pubkey);
		}
	};

	const getStoredRelayList = () => {
		const relayList = localStorage.getItem('relays');
		if (relayList) {
			const relays = JSON.parse(relayList);
			setUserRelay(ndk, relays);
		}
	};

	await setLoginUser(ndk);
	getStoredRelayList();
};

export const setUserRelay = async (ndk: NDK, relays: string[]) => {
	for (const uri of relays) {
		await ndk.addExplicitRelay(uri);
	}

	for (const [uri] of ndk.pool.relays) {
		if (!relays.includes(uri)) {
			await ndk.pool.removeRelay(uri);
		}
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
