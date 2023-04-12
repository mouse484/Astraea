declare module 'marked-linkify-it' {
	import type LinkifyIt from 'linkify-it';
	import type { marked } from 'marked';

	function linkify(
		schemas?: { [key: string]: LinkifyIt.FullRule },
		options?: LinkifyIt.Options
	): marked.MarkedExtension;
	export = linkify;
}
