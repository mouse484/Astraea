<script lang="ts">
	import TimeLine from '$lib/components/timeline/TimeLine.svelte';
	import type { PageData } from './$types';
	import type { response } from './+page';

	export let data: PageData;

	let { hexId } = data as response;
</script>

{#key hexId}
	{#if hexId}
		<TimeLine authors={[hexId]} time="ALL" />
	{/if}
{/key}
