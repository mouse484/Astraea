import { writable } from 'svelte/store';
import { setLocalStorage } from '../utils/localStorage';

export const theme = writable<'dark' | 'light'>();

theme.subscribe((t) => {
	if (!t) return;
	setLocalStorage('theme', t);
});
