<script lang="ts">
	import { page } from '$app/stores';
	import Main from '$lib/components/Main.svelte';
	import SearchForm from '$lib/components/Search/SearchForm.svelte';
	import TimeLine from '$lib/components/TimeLine/TimeLine.svelte';
	import { _ } from 'svelte-i18n';

	$: searchQuery = $page.url.searchParams.get('q');
</script>

<Main title="{searchQuery} - {$_('search.search')}">
	{#if searchQuery}
		<h3 class="text-xl">{searchQuery}</h3>
		{#key searchQuery}
			<TimeLine
				filter={{ limit: 30, search: searchQuery }}
				relays={['wss://relay.nostr.band']}
				authors="ALL"
			/>
		{/key}
	{:else}
		<SearchForm />
	{/if}
</Main>
