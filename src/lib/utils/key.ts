import { decode } from 'nostr-tools/nip19';

const isReturnString = (
	value: ReturnType<typeof decode>
): value is { type: 'npub' | 'nsec' | 'note'; data: string } => {
	return ['npub', 'nsec', 'note'].includes(value.type);
};

export const npubToHexId = (npub: string) => {
	const result = decode(npub);
	if (isReturnString(result)) {
		return result.data;
	}
};
