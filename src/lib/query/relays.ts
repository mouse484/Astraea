import { defaultRelays } from '$lib/data/const';
import { getEvent, useRelays } from '$lib/nostr/pool';
import { createQuery } from '@tanstack/svelte-query';
import { z } from 'zod';

export const relayScheme = z.record(
	z.object({
		read: z.boolean(),
		write: z.boolean()
	})
);

export const relaysQuery = (pubkey: string) => {
	return createQuery({
		queryKey: ['relays', pubkey],
		queryFn: async () => {
			console.log('query');
			const event = await getEvent(3, { authors: [pubkey] }, useRelays('read', defaultRelays));
			const parsed = relayScheme.safeParse(JSON.parse(event.content));
			if (!parsed.success) throw new Error('Cannot parse relay');
			return parsed.data;
		},
		initialData: defaultRelays,
		cacheTime: 1 * 60 * 60 * 1000,
		staleTime: 1 * 60 * 60 * 1000
	});
};
