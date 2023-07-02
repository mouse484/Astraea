<script lang="ts">
	import Children from 'svelte-exmarkdown/renderer/Children.svelte';
	import type { HastNode } from 'svelte-exmarkdown/types';

	import Link from '$lib/components/elements/Link.svelte';
	import NoteImage from './Image.svelte';

	export let type: unknown;
	export let tagName: unknown;
	export let position: unknown;
	export let __index: unknown;
	[type, tagName, position, __index];

	export let children: HastNode[];
	export let properties: { href: string };
</script>

{#if properties.href.match(/\.(jpe?g|png|gif|webp)(\??.*)$/)}
	<NoteImage src={properties.href} alt="" />
{:else if properties.href.endsWith('mp4')}
	<!-- svelte-ignore a11y-media-has-caption -->
	<video controls preload="metadata">
		<source src={properties.href} type="video/mp4" />
	</video>
{:else if properties.href.endsWith('mp3')}
	<audio src={properties.href} controls preload="metadata" />
{:else}
	<Link href={properties.href}>
		<Children {children} />
	</Link>
{/if}
