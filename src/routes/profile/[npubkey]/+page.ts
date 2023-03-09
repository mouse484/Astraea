import { redirect } from '@sveltejs/kit';
import { nip19 } from 'nostr-tools';
import type { PageLoad } from './$types';

export type response = { hexId: string | undefined };

export const load = (({ params }) => {
	try {
		// profile/npubならhexに変換
		const result = nip19.decode(params.npubkey);
		if (result && result.type === 'npub')
			return { hexId: result.data as string };
	} catch {
		// hex変換失敗したならhexがnpubか確認してリダイレクト（上に戻る）
		const tryEncode = nip19.npubEncode(params.npubkey);
		if (tryEncode) throw redirect(302, `/profile/${tryEncode}`);
	}
	// npub/hexどちらでもなければホームにリダイレクト
	throw redirect(302, '/');
}) satisfies PageLoad<response>;
