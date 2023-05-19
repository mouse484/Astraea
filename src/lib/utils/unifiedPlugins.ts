import type { Plugin } from 'unified';
import { findAndReplace } from 'hast-util-find-and-replace';
import type { Root } from 'hast';
import { h } from 'hastscript';

export const rehypeCustomEmoji: Plugin = (options: { emojis: { [keys: string]: string } }) => {
	return (tree) => {
		findAndReplace(tree as Root, [
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
