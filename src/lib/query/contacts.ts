import { subscribeEvents } from '$lib/nostr/pool';
import { createQuery } from '@tanstack/svelte-query';
import type { Event } from 'nostr-tools';
import { z } from 'zod';

const contactsScheme = z.tuple([z.string(), z.string()]);

export const contactsQuery = (pubkey: string, relays: string[]) => {
	return createQuery({
		queryKey: ['contacts', pubkey],
		queryFn: async () => {
			return await new Promise<string[]>((resolve) => {
				const contacts = new Set<string>();

				const sub = subscribeEvents(3, { authors: [pubkey] }, relays);

				sub.on('event', (event: Event) => {
					event.tags.forEach((tag) => {
						const [, pubkey] = contactsScheme.parse(tag);
						if (pubkey) contacts.add(pubkey);
					});
				});
				sub.on('eose', () => {
					resolve([...contacts]);
				});
			});
		}
	});
};
