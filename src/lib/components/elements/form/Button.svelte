<script lang="ts">
	export let disabled = false;
</script>

<button
	on:click
	class="p-2 bg-info rounded border disabled:bg-inherit"
	{disabled}
>
	<slot />
</button>
