import { get } from '$lib/utils/nostr';
import { writable } from 'svelte/store';
import { defaultRelays } from './const';

// hex key
export const pubkey = writable<string>();
// relays
export const relays = writable(defaultRelays);

pubkey.subscribe((newKey) => {
	if (newKey) localStorage.setItem('pubkey', newKey);
});

pubkey.subscribe(async (newKey) => {
	if (import.meta.env.SSR) return;
	if (!newKey) return;
	const event = await get({ kinds: [3], authors: [newKey] });
	const parsed = JSON.parse(event?.content || '') as {
		[key: string]: { read: boolean; write: boolean };
	};
	relays.set(Object.keys(parsed));
});
