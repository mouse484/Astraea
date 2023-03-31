import { getEvent } from '$lib/nostr/pool';
import { createQuery } from '@tanstack/svelte-query';

export const noteQuery = (id: string, relays: string[]) => {
	return createQuery({
		queryKey: ['note', id],
		queryFn: async () => {
			const event = await getEvent(1, { ids: [id] }, relays);
			if (event) return event;
		},
		refetchOnMount: false,
		refetchOnWindowFocus: false,
		cacheTime: 1 * 60 * 60 * 1000,
		staleTime: Infinity
	});
};
