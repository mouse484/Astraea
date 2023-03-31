import { setLocalStorage } from '$lib/utils/localStorage';
import { writable } from 'svelte/store';

export const pubkey = writable<string>();

pubkey.subscribe((newkey) => {
	if (!newkey) return;

	setLocalStorage('pubkey', newkey);
});
