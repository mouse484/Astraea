import { dev } from '$app/environment';
import { mouseNpubKey } from '$lib/data/const';
import { writable } from 'svelte/store';

export const pubkey = writable<string>(dev ? mouseNpubKey : '');

export const pubkeyClear = () => {
	pubkey.set('');
	localStorage.removeItem('pubkey');
};

pubkey.subscribe(async (newKey) => {
	if (import.meta.env.SSR) return;
	if (!newKey) return;
	localStorage.setItem('pubkey', newKey);
});
