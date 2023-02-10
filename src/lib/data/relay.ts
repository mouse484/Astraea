import { writable } from 'svelte/store';
import type { SimplePool } from 'nostr-tools';

export const relays = writable([
	'wss://relay.damus.io',
	'wss://relay.snort.social',
	'wss://eden.nostr.land'
]);

export const relayPool = writable<SimplePool>();
