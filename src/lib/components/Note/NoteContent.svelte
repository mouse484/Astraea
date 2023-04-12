<script lang="ts">
	import Markdown from '@magidoc/plugin-svelte-marked';
	import NoteLink from './NoteLink.svelte';
	import { marked } from 'marked';
	import markedLinkifyIt from 'marked-linkify-it';

	export let rawContent: string;

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
</script>

<Markdown
	source={rawContent}
	renderers={{
		link: NoteLink
	}}
/>
