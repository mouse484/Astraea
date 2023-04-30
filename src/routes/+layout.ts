import { browser } from '$app/environment';
import { QueryClient } from '@tanstack/svelte-query';
import { i18nInit } from '$lib/utils/i18n';
import type { LayoutLoad } from './$types';
import { getLocalStorage } from '../lib/utils/localStorage';
import { theme } from '../lib/store/theme';

export const load = (() => {
	if (!browser) return;
	const t = getLocalStorage('theme');
	if (t === 'dark' || (!t && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
		theme.set('dark');
	} else {
		theme.set('light');
	}
	const queryClient = new QueryClient({
		defaultOptions: {
			queries: {
				enabled: browser
			}
		}
	});

	i18nInit();

	return { queryClient };
}) satisfies LayoutLoad;
