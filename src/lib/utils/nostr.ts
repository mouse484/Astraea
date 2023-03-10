import { relays } from '$lib/data/setting';
import { SimplePool, type Filter } from 'nostr-tools';
import { get as getStore } from 'svelte/store';

export const pool = new SimplePool();

// 作り直す
// https://github.com/mouse484/nostr-client/blob/old/src/lib/utils/relay.ts

export const subscribe = (filter: Filter) => {
	return pool.sub(getStore(relays), [filter]);
};

export const get = (filter: Filter) => {
	return pool.get(getStore(relays), filter);
};
