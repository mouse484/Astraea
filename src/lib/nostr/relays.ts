import { defaultRelays } from '$lib/data/const';
import { relaysQuery } from '$lib/query/relays';
import { pubkey } from '$lib/store/pubkey';
import { get } from 'svelte/store';

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
