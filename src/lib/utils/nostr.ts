import NDK, { NDKKind } from '@nostr-dev-kit/ndk';

export const ndk = new NDK({ explicitRelayUrls: ['wss://relay.damus.io'] });
ndk.connect();

export const KIND = NDKKind;
