import { defaultRelays } from '$lib/data/const';
import { SimplePool, type Filter, type Event } from 'nostr-tools';

export const pool = new SimplePool();

export const getEvent = (kind: number, filter: Filter) => {
	return new Promise<Event>((resolve) => {
		const sub = pool.sub(Object.keys(defaultRelays), [{ kinds: [kind], limit: 1, ...filter }]);
		sub.on('event', (event: Event) => {
			if (event) {
				resolve(event);
				sub.unsub();
			}
		});
	});
};
