import { getEvent } from '$lib/nostr/pool';
import { createQuery } from '@tanstack/svelte-query';
import { z } from 'zod';

const relayScheme = z.record(
	z.object({
		read: z.boolean(),
		write: z.boolean()
	})
);

export const relaysQuery = (pubkey: string) => {
	return createQuery({
		queryKey: ['relays', pubkey],
		queryFn: async () => {
			const event = await getEvent(3, { authors: [pubkey] });
			const parsed = relayScheme.safeParse(JSON.parse(event.content));
			if (!parsed.success) throw new Error('Cannot parse relay');
			return parsed.data
		}
	});
};
