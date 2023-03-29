import { browser } from '$app/environment';
import { QueryClient } from '@tanstack/svelte-query';
import { i18nInit } from '$lib/utils/i18n';
import type { LayoutLoad } from './$types';

export const load = (() => {
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
