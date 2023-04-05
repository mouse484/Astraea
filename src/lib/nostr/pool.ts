import { relaysQuery } from '$lib/query/relays';
import { pubkey } from '$lib/store/pubkey';
import { RelayPool } from 'nostr-relaypool';
import { getEventHash, type Event, type Filter, type UnsignedEvent } from 'nostr-tools';
import { get } from 'svelte/store';

export const pool = new RelayPool();

export const useRelays = (
	isType: 'read' | 'write',
	otherRelays?: { [key: string]: { read: boolean; write: boolean } }
) => {
	const query = relaysQuery(get(pubkey));
	return Object.entries(otherRelays || get(query)?.data || {}).flatMap(([url, type]) => {
		return type[isType] ? url : [];
	});
};

export const getEvent = (kind: number, filter: Filter, relays: string[]) => {
	return new Promise<Event>((resolve) => {
		const unsub = pool.subscribe(
			[{ kinds: [kind], limit: 1, ...filter }],
			relays,
			(event) => {
				resolve(event);
			},
			undefined,
			() => {
				unsub();
			}
		);
	});
};

export const publishEvent = async (unsignedEvent: UnsignedEvent, relays: string[]) => {
	if (!window.nostr) return;
	const signedEvent = await window.nostr.signEvent({
		id: getEventHash(unsignedEvent),
		...unsignedEvent
	});
	return pool.publish(signedEvent, relays);
};
