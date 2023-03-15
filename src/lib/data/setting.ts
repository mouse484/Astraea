import { getEvent } from '$lib/utils/nostr';
import { writable } from 'svelte/store';
import { defaultRelays } from './const';

// hex key
export const pubkey = writable<string>();

export const pubkeyClear = () => {
	pubkey.set('');
	localStorage.removeItem('pubkey');
};

// relays
export const relays = writable(defaultRelays);

pubkey.subscribe((newKey) => {
	if (newKey) localStorage.setItem('pubkey', newKey);
});

pubkey.subscribe(async (newKey) => {
	if (import.meta.env.SSR) return;
	if (!newKey) return;
	const event = await getEvent({ kinds: [3], authors: [newKey] });
	const parsed = JSON.parse(event?.content || '') as {
		[key: string]: { read: boolean; write: boolean };
	};
	relays.set(Object.keys(parsed));
});
