import { browser } from '$app/environment';
import { init, addMessages, locale } from 'svelte-i18n';

import ja from '../locales/ja.json';
import en from '../locales/en.json';

const defaultLocale = 'ja';

locale.subscribe((newLocale) => {
	if (!browser) return;
	if (newLocale) localStorage.setItem('locale', newLocale);
});

export const i18nInit = () => {
	addMessages('ja', ja);
	addMessages('en', en);

	if (browser) {
		const storedLocale = localStorage.getItem('locale');
		const locale = storedLocale ? storedLocale : window.navigator.language || defaultLocale;

		init({
			fallbackLocale: defaultLocale,
			initialLocale: locale
		});

		localStorage.setItem('locale', locale);
	}
};
