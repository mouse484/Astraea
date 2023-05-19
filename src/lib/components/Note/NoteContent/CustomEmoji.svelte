<script lang="ts">
	import type { HastNode } from 'svelte-exmarkdown/types';

	export let type: unknown;
	export let tagName: unknown;
	export let __index: unknown;
	export let children: HastNode[];
	[type, tagName, __index, children];

	export let properties: { code: string; url: string };
</script>

<img src={properties.url} alt={properties.url} class="inline-block w-[1em] h-[1em]" />
