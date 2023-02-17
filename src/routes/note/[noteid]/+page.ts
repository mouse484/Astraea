import { redirect } from '@sveltejs/kit';
import type { PageLoad } from './$types';

export type response = { noteId: string | undefined };

export const load = (({ params }) => {
	try {
		return { noteId: params.noteid };
	} catch (e) {
		throw redirect(302, '/');
	}
}) satisfies PageLoad<response>;
