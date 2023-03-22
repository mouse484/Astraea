import { getEvents } from '$lib/utils/nostr';
import { createQuery } from '@tanstack/svelte-query';
import { get } from 'svelte/store';
import { Store } from './mod';
import { useRelays } from './setting';

export const useReactions = (id: string) => {
	const query = createQuery(['reactions', id], {
		queryFn: async () => {
			const relays = useRelays();
			const reactions: { [key: string]: string[] } = {};
			const events = await getEvents(get(relays).data, 7, { '#e': [id] });
			events.forEach((e) => {
				reactions[e.content] = reactions[e.content]
					? [...new Set(reactions[e.content]).add(e.pubkey)]
					: [e.pubkey];
			});

			return reactions;
		},
		initialData: {},
		staleTime: 10 * 1000
	});
	return query;
};

export const reactions = new Store();
