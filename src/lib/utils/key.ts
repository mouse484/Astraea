import { decode } from 'nostr-tools/nip19';

export const npubToHexId = (npub: string) => {
	const { data: userId } = decode(npub);
	return userId.toString();
};
