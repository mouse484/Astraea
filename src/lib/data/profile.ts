import { writable } from 'svelte/store';

export const contacts = writable<([string, string] | string)[]>([]);
