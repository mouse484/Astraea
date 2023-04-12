<script lang="ts">
	import type { marked } from 'marked';
	import Link from '../elements/Link.svelte';

	export let token: marked.Tokens.Link;

	$: isImage = token.href.match(/\.(jpe?g|png|gif|webp)(\??.*)$/);
</script>

{#if isImage}
	<img src={token.href} title={token.title} alt={token.text} />
{:else}
	<Link href="href">{token.title}</Link>
{/if}
