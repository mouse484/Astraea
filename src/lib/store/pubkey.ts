import { dev } from '$app/environment';
import { mousePubkey } from '$lib/data/const';
import { getLocalStorage, setLocalStorage } from '$lib/utils/localStorage';
import { writable } from 'svelte/store';

export const pubkey = writable<string>(getLocalStorage('pubkey') || dev ? mousePubkey : '');

pubkey.subscribe((newkey) => {
	if (!newkey) return;

	setLocalStorage('pubkey', newkey);
});
