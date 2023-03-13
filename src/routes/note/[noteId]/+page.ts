import { redirect } from '@sveltejs/kit';
import { nip19 } from 'nostr-tools';
import type { PageLoad } from './$types';

export type response = { noteId: string | undefined };

export const load = (({ params }) => {
	try {
		const result = nip19.decode(params.noteId);
		if (result && result.type === 'note')
			return { noteId: result.data as string };
	} catch {
		const tryEncode = nip19.npubEncode(params.noteId);
		if (tryEncode) throw redirect(302, `/note/${tryEncode}`);
	}
	throw redirect(302, '/');
}) satisfies PageLoad<response>;
