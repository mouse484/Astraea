import { nip19 } from 'nostr-tools';

export const npubToHexId = (npub: string) => {
	const { data: userId } = nip19.decode(npub);
	return userId.toString();
};
