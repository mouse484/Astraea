import { Store } from './mod';
import z from 'zod';
import { getEvent } from '$lib/utils/nostr';
import { createQuery } from '@tanstack/svelte-query';
import { useRelays } from './setting';
import { get } from 'svelte/store';

export const useProfile = (pubkey: string) => {
	const query = createQuery<ProfileDate>(['profile', pubkey], {
		queryFn: async () => {
			const relays = useRelays();
			const event = await getEvent(get(relays).data, 0, { authors: [pubkey] });

			if (event) {
				const parsed = profileScheme.safeParse(
					event.content ? JSON.parse(event.content) : ''
				);
				if (parsed.success) return parsed.data;
			}
			return {};
		},
		initialData: { name: 'loading' }
	});
	return query;
};

export const profiles = new Store('pubkey');

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

export type ProfileDate = z.infer<typeof profileScheme>;
