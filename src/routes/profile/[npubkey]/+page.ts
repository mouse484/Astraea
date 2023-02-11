import { decodeKey } from '$lib/utils/key';
import { redirect } from '@sveltejs/kit';
import type { PageLoad } from './$types';

export type response = { hexId: string | undefined };

export const load = (({ params }) => {
	try {
		const result = decodeKey('npub', params.npubkey);
		return { hexId: result };
	} catch (e) {
		throw redirect(302, '/profile');
	}
}) satisfies PageLoad<response>;
