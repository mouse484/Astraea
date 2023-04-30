import { writable } from 'svelte/store';
import { setLocalStorage } from '../utils/localStorage';

export const theme = writable<'dark' | 'light'>('light');

theme.subscribe((t) => setLocalStorage('theme', t));
