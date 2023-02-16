import { writable } from 'svelte/store';
import type { SimplePool } from 'nostr-tools';

export const relays = writable<string[]>([]);

export const relayPool = writable<SimplePool>();
