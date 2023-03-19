import { Store } from './mod';
import z from 'zod';
import type { Event } from 'nostr-tools';
import { subscribeEvents } from '$lib/utils/nostr';

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

export const getProfile = (noteEvents: Event[]) => {
	const hasNotProfile = [
		...new Set(
			noteEvents.flatMap((note) =>
				profiles.get(note.pubkey) ? [] : note.pubkey
			)
		)
	];
	if (hasNotProfile.length) {
		const sub = subscribeEvents(0, { authors: hasNotProfile }, 'eose');
		sub.on('event', (event) => {
			profiles.set(event);
		});

		return sub;
	}
};
