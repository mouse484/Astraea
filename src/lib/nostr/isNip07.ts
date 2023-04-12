import { browser } from '$app/environment';

export const isNip07 = () => {
	if (!browser) return false;
	return !!window.nostr;
};
