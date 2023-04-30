<script lang="ts">
	export let disabled = false;
</script>

<button
	on:click
	class="p-2 bg-blue-400 rounded border disabled:bg-slate-300 dark:text-black"
	{disabled}
>
	<slot />
</button>
