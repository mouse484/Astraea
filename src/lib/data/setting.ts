import { writable } from 'svelte/store';
import { myNpubHex } from './const';

// hex key
export const pubkey = writable<string>(myNpubHex);
