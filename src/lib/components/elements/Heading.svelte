<script lang="ts">
	export let h: 2 | 3 = 2;

	const sizes = {
		2: 'text-2xl',
		3: 'text-lg'
	};

	$: size = sizes[h];
</script>

<svelte:element this={`h${h}`} class="m-4 {size}">
	<slot />
</svelte:element>
