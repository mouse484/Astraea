import { writable } from 'svelte/store';
import { z } from 'zod';
import { getLocalStorage } from '$lib/utils/localStorage';

export const customEmojiScheme = z.array(z.tuple([z.string(), z.string()]));

export const getCustomEmojis = () => {
	const storedEmojis = getLocalStorage('emojis');
	if (!storedEmojis) return;
	const parsed = customEmojiScheme.safeParse(JSON.parse(storedEmojis));
	if (parsed.success) {
		parsed.data.forEach(([code, url]) => {
			customEmojis.update((v) => v.set(code, url));
		});
	}
	return customEmojis;
};

export const customEmojis = writable(
	new Map<string, string>().set('astraea', 'https://astraea.mousedev.page/icon.png')
);
