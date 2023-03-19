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

const pool = new SimplePool();

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
	autoUnsub?: 'eose'
) => {
	const subRelays = Object.entries(get(relays)).flatMap(([url, { read }]) => {
		return read ? url : [];
	});

	const sub = pool.sub(subRelays, [
		{ kinds: typeof kind === 'number' ? [kind] : kind, ...filter }
	]) as Subscribe;

	if (autoUnsub === 'eose') {
		sub.unsub();
	}
	return sub;
};

export const publishEvent = async (unsignedEvent: UnsignedEvent) => {
	const pubRelays = Object.entries(get(relays)).flatMap(([url, { write }]) => {
		return write ? url : [];
	});

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
