// import { browser, dev } from '$app/environment';
import { dev } from '$app/environment';
import { defaultRelays, mouseNpubKey } from '$lib/data/const';
// import { subscribeEvents } from '$lib/utils/nostr';
import { createQuery } from '@tanstack/svelte-query';
import { writable } from 'svelte/store';
import { z } from 'zod';

export const usePubkey = () => {
	const query = createQuery<string>(['pubkey'], {
		queryFn: () => {
			const localPubkey = localStorage.getItem('pubkey');
			return localPubkey || '';
		},
		initialData: undefined,
		cacheTime: Infinity,
		staleTime: Infinity
	});

	query.subscribe((q) => {
		if (q.data) localStorage.setItem('pubkey', q.data);
	});

	return query;
};

export const relays = writable<
	Record<
		string,
		{
			read: boolean;
			write: boolean;
		}
	>
>(defaultRelays);

const relayScheme = z.record(
	z.object({
		read: z.boolean(),
		write: z.boolean()
	})
);

// pubkey.subscribe(async (newKey) => {
// 	if (!browser) return;
// 	if (!newKey) return;
// 	localStorage.setItem('pubkey', newKey);
// 	const sub = subscribeEvents(3, { authors: [newKey] });
// 	sub.on('event', (event) => {
// 		const parsed = relayScheme.safeParse(JSON.parse(event.content));
// 		if (parsed.success) {
// 			relays.set(parsed.data);
// 		}
// 	});
// });
