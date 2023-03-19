<script lang="ts">
	import { afterNavigate } from '$app/navigation';
	import { page } from '$app/stores';
	import Heading from '$lib/components/elements/Heading.svelte';
	import Section from '$lib/components/elements/Section.svelte';
	import TimeLine from '$lib/components/TimeLine.svelte';
	import type { Filter } from 'nostr-tools';
	import { writable } from 'svelte/store';

	const searchQuery = writable('');

	afterNavigate(() => {
		searchQuery.set($page.url.searchParams.get('q') || '');
	});

	$: filter = { limit: 30, search: $searchQuery } as Filter;
</script>

<Heading>検索</Heading>

<Section>
	<h3 class="text-xl">{$searchQuery}</h3>
	{#if $searchQuery && filter}
		<TimeLine {filter} relays={['wss://relay.nostr.band']} authors="ALL" />
	{/if}
</Section>
