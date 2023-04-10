<script context="module" lang="ts">
	// ref: https://tailwindcss.com/docs/responsive-design
	const breakpointList = {
		sm: '(min-width: 640px)',
		md: '(min-width: 768px)',
		lg: '(min-width: 1024px)'
	};
</script>

<script lang="ts">
	import { onMount } from 'svelte';
	export let breakpoint: keyof typeof breakpointList;

	let result = false;

	const update = (matches: boolean) => (result = matches);

	onMount(() => {
		const mql = window.matchMedia(breakpointList[breakpoint]);
		update(mql.matches);
		mql.addEventListener('change', ({ matches }) => update(matches));
	});
</script>

{#if result}
	<slot />
{/if}
