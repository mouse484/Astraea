import { pool } from '$lib/nostr/pool';
import { createQuery } from '@tanstack/svelte-query';
import { z } from 'zod';

const contactsScheme = z.tuple([z.string(), z.string()]);

export const contactsQuery = (pubkey: string, relays: string[]) => {
	return createQuery({
		queryKey: ['contacts', pubkey],
		queryFn: async () => {
			return await new Promise<string[]>((resolve) => {
				const contacts = new Set<string>();
				const unsub = pool.subscribe(
					[{ kinds: [3], authors: [pubkey] }],
					relays,
					(event) => {
						event.tags.forEach((tag) => {
							const [, pubkey] = contactsScheme.parse(tag);
							if (pubkey) contacts.add(pubkey);
						});
					},
					undefined,
					() => {
						resolve([...contacts]);
						unsub();
					}
				);
			});
		}
	});
};
