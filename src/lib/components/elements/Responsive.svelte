<script context="module" lang="ts">
	// ref: https://tailwindcss.com/docs/responsive-design
	const breakpointList = {
		sm: '640',
		md: '768',
		lg: '1024'
	};
</script>

<script lang="ts">
	import { onMount } from 'svelte';

	export let breakpoint: keyof typeof breakpointList;
	export let than: 'bigger' | 'less' = 'bigger';

	let result = false;

	const update = (matches: boolean) => (result = matches);

	onMount(() => {
		const mql = window.matchMedia(
			than === 'bigger'
				? `(min-width: ${breakpointList[breakpoint]}px)`
				: `(max-width: ${breakpointList[breakpoint]}px)`
		);
		update(mql.matches);
		mql.addEventListener('change', ({ matches }) => update(matches));
	});
</script>

{#if result}
	<slot />
{/if}
