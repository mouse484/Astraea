import { writable } from 'svelte/store';

export const contacts = writable(new Set<string>());
