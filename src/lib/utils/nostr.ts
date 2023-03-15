import { relays } from '$lib/data/setting';
import { SimplePool, type Event, type Filter, type Sub } from 'nostr-tools';
import { get as getStore } from 'svelte/store';

export const pool = new SimplePool({ getTimeout: 8000 });

export const subscribeEvents = (filter: Filter) => {
	let sub: Sub;
	sub = pool.sub(getStore(relays), [filter]);
	sub.on('eose', () => {
		sub.unsub();
		sub = pool.sub(getStore(relays), [
			{ ...filter, since: Math.floor(Date.now() / 1000) }
		]);
	});
	return sub;
};

export const getEvent = (filter: Filter) => {
	return pool.get(getStore(relays), filter);
};

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
