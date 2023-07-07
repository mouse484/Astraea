import type { Root } from 'hast';
import { findAndReplace } from 'hast-util-find-and-replace';
import { h } from 'hastscript';
import type { Plugin } from 'unified';

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
				/nostr:(\w+)/g,
				(_, id) => {
					return h('nostr', { id });
				}
			],
			[
				/#(\S+)/g,
				(raw, value) => {
					return h('a', { href: `/search?q=${value}` }, raw);
				}
			]
		]);
		return tree;
	};
};
