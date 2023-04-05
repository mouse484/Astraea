import { getContext } from 'svelte';
import type { QueryClient } from '@tanstack/svelte-query';

export const QUERY_CLIENT_CONTEXT_KEY = '$$_queryClient';

export const getQueryClient = () => getContext(QUERY_CLIENT_CONTEXT_KEY) as QueryClient;
