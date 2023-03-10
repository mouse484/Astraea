<script lang="ts">
	import '../app.css';
	import Header from '$lib/components/Header.svelte';
</script>

<svelte:head>
	<title>Astraea</title>
</svelte:head>

<div class="m-4">
	<Header />
	<section class="m-4">
		<slot />
	</section>
</div>
