import { browser } from '$app/environment';
import { init, addMessages, locale } from 'svelte-i18n';
import { getLocalStorage, setLocalStorage } from './localStorage';

import ja from '../locales/ja.json';
import en from '../locales/en.json';

const defaultLocale = 'ja';

locale.subscribe((newLocale) => {
	if (!browser) return;
	if (newLocale) setLocalStorage('locale', newLocale);
});

export const i18nInit = () => {
	addMessages('ja', ja);
	addMessages('en', en);

	if (browser) {
		const storedLocale = getLocalStorage('locale');
		const locale = storedLocale ? storedLocale : window.navigator.language || defaultLocale;

		init({
			fallbackLocale: defaultLocale,
			initialLocale: locale
		});

		setLocalStorage('locale', locale);
	}
};
