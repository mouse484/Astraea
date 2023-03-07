import { defaultRelays } from '$lib/data/const';
import { SimplePool, type Filter } from 'nostr-tools';

const pool = new SimplePool();

// 作り直す
// https://github.com/mouse484/nostr-client/blob/old/src/lib/utils/relay.ts

export const subscribe = (filter: Filter) => {
	return pool.sub(defaultRelays, [filter]);
};

export const get = (filter: Filter) => {
	return pool.get(defaultRelays, filter);
};
