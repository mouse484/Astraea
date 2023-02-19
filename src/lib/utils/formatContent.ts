import { sanitize } from 'isomorphic-dompurify';
import 'linkifyjs';
import linkifyHtml from 'linkify-html';

export const formatContent = (content: string) => {
	const linked = linkifyHtml(content, {
		tagName: (href: string, type: 'url' | 'email') => {
			if (type === 'url') {
				if (new URL(href).pathname.match(/(jpe?g|png|gif|webp)$/)) return 'img';
			}
			return 'a';
		},
		render: ({
			tagName,
			attributes,
			content
		}: {
			tagName: string;
			attributes: { [attr: string]: string };
			content: string;
		}) => {
			const { href } = attributes;

			if (tagName === 'img') return `<img src=${href} alt=${content} />`;

			return linkifyHtml(content);
		}
	});
	return sanitize(linked);
};
