import { get } from '$lib/utils/nostr';
import { writable } from 'svelte/store';
import { defaultRelays, myNpubHex } from './const';

// hex key
export const pubkey = writable<string>(myNpubHex);
// relays
export const relays = writable(defaultRelays);

pubkey.subscribe(async (newKey) => {
	if (import.meta.env.SSR) return;
	const event = await get({ kinds: [3], authors: [newKey] });
	const parsed = JSON.parse(event?.content || '') as {
		[key: string]: { read: boolean; write: boolean };
	};
	relays.set(Object.keys(parsed));
});
