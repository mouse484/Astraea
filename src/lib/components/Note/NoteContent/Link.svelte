<script lang="ts">
	import type { HastNode } from 'svelte-exmarkdown/types';
	import Children from 'svelte-exmarkdown/renderer/Children.svelte';

	import NoteImage from '../NoteImage.svelte';
	import Link from '$lib/components/elements/Link.svelte';

	export let type: unknown;
	export let tagName: unknown;
	export let position: unknown;
	export let __index: unknown;
	[type, tagName, position, __index];

	export let children: HastNode[];
	export let properties: { href: string };

	$: isImage = properties.href.match(/\.(jpe?g|png|gif|webp)(\??.*)$/);
</script>

{#if isImage}
	<NoteImage src={properties.href} alt="" />
{:else}
	<Link href={properties.href}>
		<Children {children} />
	</Link>
{/if}
