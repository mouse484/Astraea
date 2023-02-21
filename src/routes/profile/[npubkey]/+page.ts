import { decodeKey } from '$lib/utils/key';
import { redirect } from '@sveltejs/kit';
import { npubEncode } from 'nostr-tools/nip19';
import type { PageLoad } from './$types';

export type response = { hexId: string | undefined };

export const load = (({ params }) => {
	const result = decodeKey('npub', params.npubkey);
	if (result) return { hexId: result };
	const tryEncode = npubEncode(params.npubkey);
	if (tryEncode) throw redirect(302, `/profile/${tryEncode}`);
	throw redirect(302, '/profile');
}) satisfies PageLoad<response>;
