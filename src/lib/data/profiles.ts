import { writable } from 'svelte/store';

export type ProfileData = Partial<{
	display_name: string;
	name: string;
	picture: string;
	nip05: string;
	about: string;
	banner: string;
	website: string;
	[key: string]: string;
}>;

export const profiles = writable(new Map<string, ProfileData>());
