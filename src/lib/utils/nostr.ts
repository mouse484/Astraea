import { relays } from '$lib/store/setting';
import { SimplePool, type Event, type Filter, type Sub } from 'nostr-tools';
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
