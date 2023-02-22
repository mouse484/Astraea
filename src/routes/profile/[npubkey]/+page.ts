import { decodeKey } from '$lib/utils/key';
import { redirect } from '@sveltejs/kit';
import { nip19 } from 'nostr-tools';
import type { PageLoad } from './$types';

export type response = { hexId: string | undefined };

export const load = (({ params }) => {
	const result = decodeKey('npub', params.npubkey);
	if (result) return { hexId: result };
	const tryEncode = nip19.npubEncode(params.npubkey);
	if (tryEncode) throw redirect(302, `/profile/${tryEncode}`);
	throw redirect(302, '/profile');
}) satisfies PageLoad<response>;
