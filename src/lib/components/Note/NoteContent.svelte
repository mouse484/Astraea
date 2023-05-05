<script lang="ts">
	import Markdown from '@magidoc/plugin-svelte-marked';
	import NoteLink from './NoteLink.svelte';
	import { marked } from 'marked';
	import markedLinkifyIt from 'marked-linkify-it';
	import NostrLinker from './NostrLinker.svelte';
	import { nip19 } from 'nostr-tools';

	export let rawContent: string;

	const nostrLinkerMarkedExtention: marked.TokenizerExtension = {
		name: 'nostr',
		level: 'inline',
		start(src) {
			return src.match(/nostr:/)?.index;
		},
		tokenizer(src, tokens) {
			const match = src.match(/^nostr:(?<id>[^ \s]+)/);
			if (!match) return;
			if (!match.groups?.id) return;
			try {
				const decoded = nip19.decode(match.groups.id);
				return {
					type: 'nostr',
					raw: match[0],
					text: decoded.data,
					ntype: decoded.type
				};
			} catch {}
		}
	};

	marked.setOptions({ breaks: true });
	marked.use(
		markedLinkifyIt({
			'#': {
				validate: /[^\s]+/,
				normalize(match) {
					match.url = `/search?q=${match.url.replace('#', '')}`;
				}
			}
		})
	);
	marked.use({ extensions: [nostrLinkerMarkedExtention] });
</script>

<Markdown
	source={rawContent}
	renderers={{
		link: NoteLink,
		nostr: NostrLinker
	}}
/>
