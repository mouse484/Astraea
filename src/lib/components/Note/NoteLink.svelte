<script lang="ts">
	import type { marked } from 'marked';
	import Link from '../elements/Link.svelte';
	import NoteImage from './NoteImage.svelte';

	export let token: marked.Tokens.Link;

	$: isImage = token.href.match(/\.(jpe?g|png|gif|webp)(\??.*)$/);
</script>

{#if isImage}
	<NoteImage src={token.href} alt={token.text} />
{:else}
	<Link href={token.href}>{token.title || token.href}</Link>
{/if}
