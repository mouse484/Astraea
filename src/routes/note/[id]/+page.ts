import { redirect } from '@sveltejs/kit';
import { nip19 } from 'nostr-tools';
import type { PageLoad } from './$types';

export const load = (({ params }) => {
	try {
		const result = nip19.decode(params.id);
		if (result && result.type === 'note')
			return { id: result.data as string };
	} catch {
		const tryEncode = nip19.noteEncode(params.id);
		if (tryEncode) throw redirect(302, `/note/${tryEncode}`);
	}
	throw redirect(302, '/');
}) satisfies PageLoad;
