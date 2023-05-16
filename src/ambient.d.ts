/// <reference types="vite-plugin-pwa/client" />
/// <reference types="vite-plugin-pwa/info" />

declare module 'marked-linkify-it' {
	import type LinkifyIt from 'linkify-it';
	import type { marked, marked } from 'marked';

	function linkify(
		schemas?: { [key: string]: LinkifyIt.FullRule },
		options?: LinkifyIt.Options
	): marked.MarkedExtension;
	export = linkify;
}

declare module 'marked-emoji' {
	function markedEmoji(options: {
		emojis: { [key: string]: string };
		unicode?: boolean;
	}): marked.MarkedExtension;
	export { markedEmoji };
}
