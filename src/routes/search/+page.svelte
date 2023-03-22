<script lang="ts">
	import { afterNavigate } from '$app/navigation';
	import { page } from '$app/stores';
	import Heading from '$lib/components/elements/Heading.svelte';
	import Section from '$lib/components/elements/Section.svelte';
	import SearchForm from '$lib/components/Search/SearchForm.svelte';
	import TimeLine from '$lib/components/TimeLine.svelte';
	import { writable } from 'svelte/store';

	const searchQuery = writable('');

	afterNavigate(() => {
		searchQuery.set($page.url.searchParams.get('q') || '');
	});
</script>

<Heading>検索</Heading>

<Section>
	<h3 class="text-xl">{$searchQuery}</h3>
	{#key $searchQuery}
		{#if $searchQuery}
			<TimeLine
				filter={{ limit: 30, search: $searchQuery }}
				newOnly={true}
				relays={['wss://relay.nostr.band']}
				authors="ALL"
			/>
		{:else}
			<SearchForm />
		{/if}
	{/key}
</Section>
