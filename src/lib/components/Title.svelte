<script lang="ts">
	import { name } from '$lib/data/const';

	export let pageTitle: string;
</script>

<svelte:head>
	<title>{pageTitle} - {name}</title>
</svelte:head>
