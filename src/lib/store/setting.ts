import { dev } from '$app/environment';
import { defaultRelays, mouseNpubKey } from '$lib/data/const';
import { subscribeEvents } from '$lib/utils/nostr';
import { writable } from 'svelte/store';
import { z } from 'zod';

export const pubkey = writable<string>(dev ? mouseNpubKey : '');
export const relays = writable<
	Record<
		string,
		{
			read: boolean;
			write: boolean;
		}
	>
>(defaultRelays);

export const pubkeyClear = () => {
	pubkey.set('');
	localStorage.removeItem('pubkey');
};

const relayScheme = z.record(
	z.object({
		read: z.boolean(),
		write: z.boolean()
	})
);

pubkey.subscribe(async (newKey) => {
	if (import.meta.env.SSR) return;
	if (!newKey) return;
	localStorage.setItem('pubkey', newKey);
	const sub = subscribeEvents(3, { authors: [newKey] });
	sub.on('event', (event) => {
		const parsed = relayScheme.parse(event.content);
		if (parsed) {
			relays.set(parsed);
		}
	});
});
