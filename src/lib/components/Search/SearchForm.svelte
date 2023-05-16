<script lang="ts">
	import { goto } from '$app/navigation';
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
	<input class="p-2 rounded border grow" type="text" name="q" bind:value={searchInput} />
	<button class="btn" disabled={!searchInput}>{$_('search.search')}</button>
</form>
