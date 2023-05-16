<script lang="ts">
	import Markdown from '@magidoc/plugin-svelte-marked';
	import NoteLink from './NoteLink.svelte';
	import { marked } from 'marked';
	import markedLinkifyIt from 'marked-linkify-it';
	import { markedEmoji } from 'marked-emoji';
	import NostrLinker from './NostrLinker.svelte';
	import { nip19, type Event } from 'nostr-tools';
	import CustomEmoji from './CustomEmoji.svelte';

	export let event: Event;

	const emojis = Object.fromEntries(
		event.tags.filter(([key]) => key === 'emoji').map(([, code, url]) => [code, url])
	);
	console.log(emojis);

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
					value: decoded
				};
			} catch {}
		}
	};

	marked.setOptions({ breaks: true });
	marked.use(markedEmoji({ emojis, unicode: false }));
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

<!-- {JSON.stringify(marked.lexer(event.content))} -->

<Markdown
	source={event.content}
	renderers={{
		link: NoteLink,
		nostr: NostrLinker,
		emoji: CustomEmoji
	}}
/>
