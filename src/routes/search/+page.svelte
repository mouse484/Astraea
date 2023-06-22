<script lang="ts">
	import { page } from '$app/stores';
	import Heading from '$lib/components/elements/Heading.svelte';
	import Section from '$lib/components/elements/Section.svelte';
	import SearchForm from '$lib/components/Search/SearchForm.svelte';
	import TimeLine from '$lib/components/TimeLine/TimeLine.svelte';
	import Title from '$lib/components/Title.svelte';
	import { _ } from 'svelte-i18n';

	$: searchQuery = $page.url.searchParams.get('q');
</script>

<Title pageTitle="{searchQuery} - {$_('search.search')}" />

<div>
	<Heading>{$_('search.search')}</Heading>

	<Section className="h-full">
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
	</Section>
</div>
