import { redirect } from '@sveltejs/kit';
import type { PageLoad } from './$types';
import { pubkey } from '../../lib/store/pubkey';
import { get } from 'svelte/store';

export const load = (() => {
	if (get(pubkey)) throw redirect(302, '/');
}) satisfies PageLoad;
