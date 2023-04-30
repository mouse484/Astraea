import { nip19 } from 'nostr-tools';

export const decode = (type: 'npub' | 'note', key: string) => {
	try {
		const decoded = nip19.decode(key);
		if (decoded.type === type) return decoded.data as string;
		return undefined;
	} catch {
		return undefined;
	}
};
