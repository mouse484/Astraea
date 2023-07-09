<script lang="ts">
	import Title from './Title.svelte';
	import Heading from './elements/Heading.svelte';

	export let title: string;
</script>

<Title pageTitle={title} />

<main class="w-full mx-4 h-screen">
	<div class="sticky pt-4 top-0 bg-base-100 z-50">
		<Heading>{title}</Heading>
		<slot name="top" />
	</div>
	<div class="mt-4 mx-2">
		<slot />
	</div>
</main>
