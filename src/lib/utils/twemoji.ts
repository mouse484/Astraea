import { default as emoji } from 'twemoji';

export const twemoji = (
	node: HTMLElement,
	options: Parameters<(typeof emoji)['parse']>[1] = {}
) => {
	emoji.parse(node, { folder: 'svg', ext: '.svg', ...options });
};
