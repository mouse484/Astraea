import { sanitize } from 'isomorphic-dompurify';
import 'linkifyjs';
import linkifyHtml from 'linkify-html';
import { contentImageClass } from '$lib/components/Note.css';
import type { Event } from 'nostr-tools';

export const formatContent = (event: Event) => {
	const { content, tags } = event;
	const sanitized = sanitize(content);
	const cc = sanitized.replaceAll(/#\[([0-9])\]/g, (_all, $1) => {
		const [type, id] = tags[$1] || []; // 仮
		return `${type === 'p' ? `#[${id}]` : ''}`;
	});
	const linked = linkifyHtml(cc, {
		nl2br: true,
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

			if (tagName === 'img')
				return `<img src=${href} alt=${content} class=${contentImageClass} />`;

			return linkifyHtml(content);
		}
	});

	return sanitize(linked);
};
