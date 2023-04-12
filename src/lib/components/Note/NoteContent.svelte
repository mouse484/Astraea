<script lang="ts">
	import Markdown from '@magidoc/plugin-svelte-marked';
	import NoteLink from './NoteLink.svelte';
	export let rawContent: string;


</script>

<Markdown
	source={rawContent}
	renderers={{
		link: NoteLink
	}}
/>
