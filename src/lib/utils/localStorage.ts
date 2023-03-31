import { browser } from '$app/environment';

type list = 'pubkey' | 'locale';

export const setLocalStorage = (type: list, value: string) => {
	if (!browser) return;

	localStorage.setItem(type, value);
};
export const getLocalStorage = (type: list) => {
	if (!browser) return;

	return localStorage.getItem(type);
};
