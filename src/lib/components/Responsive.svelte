<script context="module" lang="ts">
	import { browser } from '$app/environment';

	// ref: https://tailwindcss.com/docs/responsive-design
	const breakpointList = {
		sm: '(min-width: 640px)',
		md: '(min-width: 768px)',
		lg: '(min-width: 1024px)'
	};
	export const matchMedia = (breakpoint: keyof typeof breakpointList) => {
		let result = false;
		if (!browser) return result;
		const mql = window.matchMedia(breakpointList[breakpoint]);
		result = mql.matches;
		mql.addEventListener('change', ({ matches }) => (result = matches));
		return result;
	};
</script>

<script lang="ts">
	import { onMount } from 'svelte';
	export let breakpoint: keyof typeof breakpointList;
	let result = false;
	onMount(() => {
		result = matchMedia(breakpoint);
	});
</script>

{#if result}
	<slot />
{/if}
