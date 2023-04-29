<script lang="ts">
	import { afterNavigate } from '$app/navigation';
	import { page } from '$app/stores';
	import Heading from '$lib/components/elements/Heading.svelte';
	import Section from '$lib/components/elements/Section.svelte';
	import SearchForm from '$lib/components/Search/SearchForm.svelte';
	// import SearchForm from '$lib/components/Search/SearchForm.svelte';
	import TimeLine from '$lib/components/TimeLine/TimeLine.svelte';
	import Title from '$lib/components/Title.svelte';
	import { _ } from 'svelte-i18n';
	import { writable } from 'svelte/store';

	const searchQuery = writable('');

	afterNavigate(() => {
		searchQuery.set($page.url.searchParams.get('q') || '');
	});
</script>

<Title pageTitle="{$searchQuery} - {$_('search.search')}" />

<div>
	<Heading>{$_('search.search')}</Heading>

	<Section>
		<h3 class="text-xl">{$searchQuery}</h3>
		{#key $searchQuery}
			{#if $searchQuery}
				<TimeLine
					filter={{ limit: 30, search: $searchQuery }}
					relays={['wss://relay.nostr.band']}
					authors="ALL"
				/>
			{:else}
				<SearchForm />
			{/if}
		{/key}
	</Section>
</div>
