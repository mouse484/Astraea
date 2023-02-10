import { npubToHexId } from '$lib/utils/key';
import { redirect } from '@sveltejs/kit';
import type { PageLoad } from './$types';

export type response = { hexId: string };

export const load = (({ params }) => {
	try {
		const result = npubToHexId(params.npubkey);
		if (result) {
			return { hexId: result };
		}
		throw new Error('required npub key');
	} catch (e) {
		throw redirect(302, '/profile');
	}
}) satisfies PageLoad<response>;
