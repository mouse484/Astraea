import { writable } from 'svelte/store';

export type ProfileData = Partial<{
	display_name: string;
	name: string;
	picture: string;
	nip05: string;
	[key: string]: string;
}>;

export const contacts = writable<[string, string][]>([]);

export const users = writable(new Map<string, ProfileData>());
