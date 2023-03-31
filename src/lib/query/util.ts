import { getContext } from 'svelte';
import type { QueryClient } from '@tanstack/svelte-query';

export const setQuery = (key: string[], value: unknown) => {
	const queryClient: QueryClient = getContext('$$_queryClient');
	if (!queryClient) return;
	queryClient.setQueryData(key, value);
};
