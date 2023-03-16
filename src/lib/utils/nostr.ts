import { relays } from '$lib/data/setting';
import { SimplePool, type Event, type Filter, type Sub } from 'nostr-tools';
import { get as getStore } from 'svelte/store';

export const pool = new SimplePool({ getTimeout: 8000 });

export const subscribeEvents = (
	filter: Filter,
	useRelays = getStore(relays)
) => {
	return pool.sub(useRelays, [{ limit: 30, ...filter }]);
};

export const getEvent = (filter: Filter) =>
	new Promise<Event>((resolve) => {
		const sub = pool.sub(getStore(relays), [{ ...filter, limit: 1 }]);
		sub.on('event', (event: Event) => {
			sub.unsub();
			resolve(event);
		});
	});
// return pool.get(getStore(relays), { ...filter, limit: 1 });

export const publish = async (
	event: Event
): Promise<{ status: 'ok' } | { status: 'failed'; reason: string }> => {
	return new Promise((resolve) => {
		const pub = pool.publish(getStore(relays), event);
		pub.on('ok', () => {
			resolve({ status: 'ok' });
		});
		pub.on('failed', (reason: string) => {
			resolve({ status: 'failed', reason });
		});
	});
};
