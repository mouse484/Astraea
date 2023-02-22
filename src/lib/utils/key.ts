import { nip19 } from 'nostr-tools';

const { decode } = nip19;

const isReturnString = (
	value: ReturnType<typeof decode>
): value is { type: 'npub' | 'nsec' | 'note'; data: string } => {
	return ['npub', 'nsec', 'note'].includes(value.type);
};

export const decodeKey = (type: 'npub' | 'nsec' | 'note', key: string) => {
	try {
		const result = decode(key);
		if (!isReturnString(result)) return;
		switch (type) {
			case 'npub':
				if (result.type === 'npub') return result.data;
				break;
			case 'nsec':
				if (result.type === 'nsec') return result.data;
				break;
			case 'note':
				if (result.type === 'note') return result.data;
				break;
		}
	} catch {
		/**	 */
	}
};
