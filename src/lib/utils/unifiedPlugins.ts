import type { Plugin } from 'unified';
import { findAndReplace } from 'hast-util-find-and-replace';
import type { Root } from 'hast';
import { h } from 'hastscript';

export const rehypeNostrContent: Plugin = (options: { emojis: { [keys: string]: string } }) => {
	return (tree) => {
		findAndReplace(tree as Root, [
			[
				/nostr:(.+)/g,
				(_, id) => {
					return h('nostr', { id });
				}
			],
			[
				/:(.+):/g,
				(raw, code) => {
					const emojiUrl = options.emojis[code];
					if (emojiUrl) {
						return h('emoji', { code, url: emojiUrl });
					}
					return raw;
				}
			]
		]);
		return tree;
	};
};
