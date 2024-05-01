import { error } from '@sveltejs/kit';
import { unfurl } from 'unfurl.js';
import type { RequestHandler } from './$types';

export const GET: RequestHandler = async ({ url: request }) => {
	const url = request.searchParams.get('url');

	if (!url) {
		error(404, {
			message: 'require url param'
		});
	}

	const result = await unfurl(url).catch((err) => {
		error(404, {
			message: err
		});
	});

	return new Response(JSON.stringify(result), {
		headers: { 'Content-Type': 'text/json' }
	});
};
