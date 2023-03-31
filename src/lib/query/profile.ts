import { getEvent } from '$lib/nostr/pool';
import { createQuery } from '@tanstack/svelte-query';
import { z } from 'zod';

export const profileScheme = z
	.object({
		display_name: z.string(),
		name: z.string(),
		picture: z.string(),
		nip05: z.string(),
		about: z.string(),
		banner: z.string(),
		website: z.string()
	})
	.partial()
	.passthrough();

export const profileQuery = (pubkey: string, relays: string[]) => {
	return createQuery({
		queryKey: ['profile', pubkey],
		queryFn: async () => {
			const event = await getEvent(0, { authors: [pubkey] }, relays);
			if (event) {
				const parsed = profileScheme.safeParse(JSON.parse(event.content));
				if (parsed.success) {
					return parsed.data;
				}
			}
			throw new Error('profile');
		},
		initialData: { name: 'loading' },
		retry: 3
	});
};
