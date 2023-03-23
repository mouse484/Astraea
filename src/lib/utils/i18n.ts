import { browser } from '$app/environment';
import { init, addMessages } from 'svelte-i18n';

import ja from '../locales/ja.json';
import en from '../locales/en.json';

const defaultLocale = 'ja';

export const i18nInit = () => {
	addMessages('ja', ja);
	addMessages('en', en);

	init({
		fallbackLocale: defaultLocale,
		initialLocale: browser ? window.navigator.language : defaultLocale
	});
};
