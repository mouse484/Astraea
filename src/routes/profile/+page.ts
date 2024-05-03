// import { redirect } from '@sveltejs/kit';
import { user } from '$lib/stores/user.svelte';
import { redirect } from '@sveltejs/kit';
import type { PageLoad } from './$types';

export const load: PageLoad = () => {
	const { pubkey } = user;
	if (!pubkey) {
		return redirect(301, '/');
	} else {
		redirect(301, `/profile/${pubkey}`);
	}
};
