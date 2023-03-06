import DOMPurify from 'isomorphic-dompurify';
import MarkdownIt, { type PluginSimple } from 'markdown-it';
import Token from 'markdown-it/lib/token';
import { contentImageClass } from '$lib/components/Note.css';
import type { Event } from 'nostr-tools';

const { sanitize } = DOMPurify;

const imageLinkToImgTag: PluginSimple = (md) => {
	md.core.ruler.after('linkify', 'image2link', (state) => {
		state.tokens = state.tokens.flatMap((token) => {
			if (token.type !== 'inline') return token;
			if (!token.children) return token;
			return token.children.map((child) => {
				if (child.type === 'link_open') {
					const href = child.attrGet('href');
					// 画像表示
					if (href?.match(/(jpe?g|png|gif|webp)$/)) {
						const imgToken = new Token('img', 'img', 0);
						imgToken.attrSet('src', href);
						imgToken.attrSet('class', contentImageClass);
						return imgToken;
					}
				}
				return child;
			});
		});
		return state;
	});
};

const md = MarkdownIt({ linkify: true, breaks: true });
md.use(imageLinkToImgTag);

export const formatContent = (event: Event) => {
	const { content, tags } = event;
	const sanitized = sanitize(content);
	const cc = sanitized.replaceAll(/#\[([0-9])\]/g, (_all, $1) => {
		const [type, id] = tags[$1] || []; // 仮
		return `${type === 'p' ? `#[${id}]` : ''}`;
	});

	const result = md.render(cc);

	return result;
};
