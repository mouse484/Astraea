import { browser } from '$app/environment';
import NDK, { NDKNip07Signer, type NDKConstructorParams } from '@nostr-dev-kit/ndk';
import NDKCacheAdapterDexie from '@nostr-dev-kit/ndk-cache-dexie';

const createNDKStore = () => {
	const defaultOptions: NDKConstructorParams = {
		explicitRelayUrls: ['wss://relay.damus.io', 'wss://yabu.me'],
		autoConnectUserRelays: false,
		enableOutboxModel: true
	};
	const ndk = $derived(
		browser
			? new NDK({
					...defaultOptions,
					cacheAdapter: new NDKCacheAdapterDexie({ dbName: 'nostr-cache' }),
					signer: new NDKNip07Signer()
				})
			: new NDK(defaultOptions)
	);
	return {
		get ndk() {
			return ndk;
		}
	};
};

export const nostr = createNDKStore();
