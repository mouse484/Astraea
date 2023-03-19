import { Store } from './mod';
import z from 'zod';

export const profiles = new Store('pubkey');

export const profileScheme = z
	.object({
		display_name: z.string(),
		name: z.string(),
		picture: z.string(),
		nip05: z.string(),
		about: z.string(),
		banner: z.string(),
		website: z.string()
	})
	.partial()
	.passthrough();

export type ProfileDate = z.infer<typeof profileScheme>;
