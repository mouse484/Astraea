import { i18nInit } from '$lib/utils/i18n';
import type { LayoutLoad } from './$types';

export const load = (() => {
	i18nInit();
}) satisfies LayoutLoad;
