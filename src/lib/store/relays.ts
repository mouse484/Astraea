import { defaultRelays } from '$lib/data/const';
import { writable } from 'svelte/store';

export const relays = writable(defaultRelays);
