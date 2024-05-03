import NDK, { NDKNip07Signer, NDKUser, type NDKUserProfile } from '@nostr-dev-kit/ndk';
import NDKCacheAdapterDexie from '@nostr-dev-kit/ndk-cache-dexie';
import { user } from './user.svelte';
import { browser } from '$app/environment';

export const useNDK = () => {
	const ndk = $state(
		new NDK({
			explicitRelayUrls: ['wss://relay.damus.io', 'wss://yabu.me'],
			cacheAdapter: new NDKCacheAdapterDexie({ dbName: 'nostr-cache' }),
			signer: browser ? new NDKNip07Signer() : undefined,
			autoConnectUserRelays: false
			// enableOutboxModel: true
		})
	);

	const init = async () => {
		const nip08user = await ndk.signer?.user();
		if (nip08user) {
			user.setPubkey(nip08user.pubkey);
		}
	};

	init();
	ndk.connect();

	return ndk;
};

export const fetchProfile = async (user: NDKUser) => {
	const profile = (await user.fetchProfile()) as Record<string, unknown>;
	if ('profile' in profile) {
		return profile.profile as NDKUserProfile;
	} else {
		return profile as NDKUserProfile;
	}
};
