import { relays } from '$lib/store/setting';
import {
	getEventHash,
	SimplePool,
	type Event,
	type Filter,
	type Sub,
	type UnsignedEvent
} from 'nostr-tools';
import { get } from 'svelte/store';

export const pool = new SimplePool();

const useRalays = (isType: 'read' | 'write') => {
	return Object.entries(get(relays)).flatMap(([url, type]) => {
		return type[isType] ? url : [];
	});
};

export type Subscribe = {
	sub: (filters: Filter[]) => Sub;
	unsub: () => void;
	on: <type extends 'event' | 'eose'>(
		type: type,
		cb: (event: type extends 'event' ? Event : never) => void
	) => void;
	off: (type: 'event' | 'eose', cb: unknown) => void;
};

export const subscribeEvents = (
	kind: number | number[],
	filter: Omit<Filter, 'kinds'>,
	autoUnsub?: 'eose' | '',
	orelays: string[] = []
) => {
	const subRelays = orelays.length ? orelays : useRalays('read');

	const sub = pool.sub(subRelays, [
		{ kinds: typeof kind === 'number' ? [kind] : kind, ...filter }
	]) as Subscribe;

	if (autoUnsub === 'eose') {
		sub.unsub();
	}
	return sub;
};

export const getEvent = (
	kind: number | number[],
	filter: Omit<Filter, 'kinds'>
) => {
	return pool.get(useRalays('read'), {
		kinds: typeof kind === 'number' ? [kind] : kind,
		...filter
	});
};

export const publishEvent = async (unsignedEvent: UnsignedEvent) => {
	const pubRelays = useRalays('write');

	if (!window.nostr) return;
	const signedEvent = await window.nostr.signEvent({
		id: getEventHash(unsignedEvent),
		...unsignedEvent
	});
	const pub = pool.publish(pubRelays, signedEvent);
	pub.on('failed', (reason: string) => {
		console.error({ reason });
	});
	return pub;
};
