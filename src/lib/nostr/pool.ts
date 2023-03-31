import { relaysQuery } from '$lib/query/relays';
import { pubkey } from '$lib/store/pubkey';
import { SimplePool, type Filter, type Event } from 'nostr-tools';
import { get } from 'svelte/store';

export const pool = new SimplePool();

export const useRelays = (
	isType: 'read' | 'write',
	otherRelays?: { [key: string]: { read: boolean; write: boolean } }
) => {
	const query = relaysQuery(get(pubkey));
	return Object.entries(otherRelays || get(query)?.data || {}).flatMap(([url, type]) => {
		return type[isType] ? url : [];
	});
};

export const subscribeEvents = (kind: number, filter: Filter, relays: string[]) => {
	return pool.sub(relays, [{ kinds: [kind], ...filter }]);
};

export const getEvent = (kind: number, filter: Filter, relays: string[]) => {
	return new Promise<Event>((resolve) => {
		const sub = pool.sub(relays, [{ kinds: [kind], limit: 1, ...filter }]);
		sub.on('event', (event: Event) => {
			if (event) {
				resolve(event);
				sub.unsub();
			}
		});
	});
};
