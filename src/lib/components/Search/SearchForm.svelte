<script lang="ts">
	import { goto } from '$app/navigation';
	import Button from '../elements/form/Button.svelte';
	import { _ } from 'svelte-i18n';

	export let searchInput: string = '';
</script>

<form
	class="flex gap-2 w-full"
	on:submit|preventDefault={() => {
		goto(`/search?q=${searchInput}`);
		searchInput = '';
	}}
>
	<input class="p-2 border rounded grow" type="text" name="q" bind:value={searchInput} />
	<Button disabled={!searchInput}>{$_('search.search')}</Button>
</form>
