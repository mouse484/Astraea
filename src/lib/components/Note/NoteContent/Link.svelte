<script lang="ts">
	import type { HastNode } from 'svelte-exmarkdown/types';
	import Children from 'svelte-exmarkdown/renderer/Children.svelte';

	import NoteImage from '../NoteImage.svelte';
	import Link from '$lib/components/elements/Link.svelte';

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
