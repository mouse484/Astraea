import NDK, { NDKKind } from '@nostr-dev-kit/ndk';
import NDKCacheAdapterDexie from '@nostr-dev-kit/ndk-cache-dexie';

export const ndk = new NDK({
	explicitRelayUrls: ['wss://relay.damus.io'],
	cacheAdapter: new NDKCacheAdapterDexie({ dbName: 'nostr-cache' })
});
ndk.connect();

export const KIND = NDKKind;
