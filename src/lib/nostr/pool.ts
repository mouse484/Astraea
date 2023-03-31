import { SimplePool, type Filter, type Event } from 'nostr-tools';

export const pool = new SimplePool();

export const useRelays = (
	relays: { [key: string]: { read: boolean; write: boolean } },
	isType: 'read' | 'write'
) => {
	return Object.entries(relays).flatMap(([url, type]) => {
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
