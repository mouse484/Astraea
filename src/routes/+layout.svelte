<script lang="ts">
	import '../app.css';
	import Header from '$lib/components/Header.svelte';
</script>

<div class="m-4">
	<Header />
	<section class="m-4">
		<slot />
	</section>
</div>
