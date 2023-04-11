import { defaultRelays } from '$lib/data/const';
import { relaysQuery } from '$lib/query/relays';
import { pubkey } from '$lib/store/pubkey';
import { getEventHash, type Event, type Filter, type UnsignedEvent, SimplePool } from 'nostr-tools';
import { get } from 'svelte/store';

const pool = new SimplePool();

export const useRelays = (
	isType: 'read' | 'write',
	otherRelays?: { [key: string]: { read: boolean; write: boolean } }
) => {
	return Object.entries(
		otherRelays || get(relaysQuery(get(pubkey)))?.data || defaultRelays
	).flatMap(([url, type]) => {
		return type[isType] ? url : [];
	});
};

export const subscribeEvents = (
	kind: number,
	filter: Filter,
	relays: string[],
	options?: { eoseUnsub?: boolean }
) => {
	const sub = pool.sub(relays, [{ kinds: [kind], ...filter }]);
	if (options?.eoseUnsub) {
		sub.on('eose', () => {
			sub.unsub();
		});
	}
	return sub;
};

export const getEvent = (kind: number, filter: Filter, relays: string[]) => {
	return new Promise<Event>((resolve) => {
		const sub = pool.sub(relays, [{ kinds: [kind], limit: 1, ...filter }]);
		sub.on('event', (event: Event) => {
			resolve(event);
			sub.unsub();
		});
	});
};

export const publishEvent = async (unsignedEvent: UnsignedEvent, relays: string[]) => {
	if (!window.nostr) return;
	const signedEvent = await window.nostr.signEvent({
		id: getEventHash(unsignedEvent),
		...unsignedEvent
	});
	return pool.publish(relays, signedEvent);
};
