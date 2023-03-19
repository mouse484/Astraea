import { redirect } from '@sveltejs/kit';
import { nip19 } from 'nostr-tools';
import type { PageLoad } from './$types';

export type response = { pubHex: string | undefined };

export const load = (({ params }) => {
	try {
		// profile/npubならhexに変換
		const result = nip19.decode(params.pubkey);
		if (result && result.type === 'npub')
			return { pubkey: result.data as string };
	} catch {
		// hex変換失敗したならhexがnpubか確認してリダイレクト（上に戻る）
		const tryEncode = nip19.npubEncode(params.pubkey);
		if (tryEncode) throw redirect(302, `/profile/${tryEncode}`);
	}
	// npub/hexどちらでもなければホームにリダイレクト
	throw redirect(302, '/');
}) satisfies PageLoad;
