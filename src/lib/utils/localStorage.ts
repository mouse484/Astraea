import { browser } from '$app/environment';

type list = 'pubkey';

export function setLocalStorage(type: list, value: string) {
	if (!browser) return;

	localStorage.setItem(type, value);
}
