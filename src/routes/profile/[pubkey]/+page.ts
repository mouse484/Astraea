import { redirect } from '@sveltejs/kit';
import { nip19 } from 'nostr-tools';
import type { PageLoad } from './$types';

export const load = (({ params }) => {
	try {
		const result = nip19.decode(params.pubkey);
		if (result && result.type === 'npub') return { pubkey: result.data as string };
	} catch {
		const tryEncode = nip19.npubEncode(params.pubkey);
		if (tryEncode) throw redirect(302, `/profile/${tryEncode}`);
	}
	throw redirect(302, '/');
}) satisfies PageLoad;
