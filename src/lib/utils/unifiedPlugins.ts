import type { Plugin } from 'unified';
import { findAndReplace } from 'hast-util-find-and-replace';
import type { Root } from 'hast';
import { h } from 'hastscript';

export const rehypeNostrContent: Plugin = (options: { emojis: { [keys: string]: string } }) => {
	return (tree) => {
		findAndReplace(tree as Root, [
			[
				/:(\w+):/g,
				(raw, code) => {
					const emojiUrl = options.emojis[code];
					if (emojiUrl) {
						return h('emoji', { code, url: emojiUrl });
					}
					return raw;
				}
			],
			[
				/nostr:(.+)/g,
				(_, id) => {
					return h('nostr', { id });
				}
			],
			[
				/#(\S+)/g,
				(raw, value) => {
					console.log(raw)
					return h('a', { href: `/search?q=${value}` }, raw);
				}
			]
		]);
		return tree;
	};
};
