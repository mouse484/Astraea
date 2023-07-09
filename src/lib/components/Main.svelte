<script lang="ts">
	import Title from './Title.svelte';
	import Heading from './elements/Heading.svelte';

	export let title: string;
</script>

<Title pageTitle={title} />
<main class="w-full m-4">
	<Heading>{title}</Heading>
	<div class="mt-4">
		<slot />
	</div>
</main>
