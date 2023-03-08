<script lang="ts">
	import DOMPurify from 'isomorphic-dompurify';
	import MarkdownIt, { type PluginSimple } from 'markdown-it';
	import Token from 'markdown-it/lib/token';

	const { sanitize } = DOMPurify;

	export let rawContent: string;

	const imageLinkToImgTag: PluginSimple = (md) => {
		md.core.ruler.after('linkify', 'image2link', (state) => {
			state.tokens = state.tokens.flatMap((token) => {
				if (token.type !== 'inline') return token;
				if (!token.children) return token;
				return token.children.map((child) => {
					if (child.type === 'link_open') {
						const href = child.attrGet('href');
						if (href?.match(/(jpe?g|png|gif|webp)$/)) {
							const imgToken = new Token('img', 'img', 0);
							imgToken.attrSet('src', href);
							imgToken.attrSet('class', 'h-48');
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

	const sanitized = sanitize(rawContent);

	const result = md.render(sanitized);
</script>

<div class="break-words">
	{@html result}
</div>
