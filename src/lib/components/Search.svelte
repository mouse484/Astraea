<script lang="ts">
	import Button from './elements/Button.svelte';

	let searchInput: string = '';
</script>

<form class="flex gap-4 w-full" action="/search">
	<input
		class="p-2 border rounded grow"
		type="text"
		name="q"
		value={searchInput}
	/>
	<Button type="submit">検索</Button>
</form>
