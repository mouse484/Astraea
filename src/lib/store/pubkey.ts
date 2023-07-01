import { dev } from '$app/environment';
import { mousePubkey } from '$lib/data/const';
import { getLocalStorage } from '$lib/utils/localStorage';
import { writable } from 'svelte/store';

const localKey = getLocalStorage('pubkey');

export const pubkey = writable<string>(localKey || (dev ? mousePubkey : ''));
