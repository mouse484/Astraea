import { error } from '@sveltejs/kit';
import type { RequestHandler } from './$types';

export const GET: RequestHandler = async ({ url: request }) => {
	const url = request.searchParams.get('url');
	if (!url) {
		throw error(404, {
			message: 'require url param'
		});
	}

	const response = await fetch(url);

	if (!response.ok) {
		throw error(404, {
			message: 'fetch error'
		});
	}

	const result = await response.json();

	return new Response(JSON.stringify(result), {
		headers: { 'Content-Type': 'text/json' }
	});
};
