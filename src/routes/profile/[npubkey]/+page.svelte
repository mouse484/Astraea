<script lang="ts">
	import TimeLine from '$lib/components/Profile/TimeLine.svelte';
	import type { PageData } from './$types';
	import type { response } from './+page';

	export let data: PageData;

	let { hexId } = data as response;
</script>

{#if hexId}
	<TimeLine {hexId} />
{/if}
