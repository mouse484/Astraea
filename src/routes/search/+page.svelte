<script lang="ts">
	import { afterNavigate } from '$app/navigation';
	import { page } from '$app/stores';
	import Heading from '$lib/components/elements/Heading.svelte';
	import Section from '$lib/components/elements/Section.svelte';
	import Loading from '$lib/components/Loading.svelte';
	import Note from '$lib/components/Note/Note.svelte';
	import { notes } from '$lib/store/notes';
	import { getProfile } from '$lib/store/profiles';
	import { subscribeEvents, type Subscribe } from '$lib/utils/nostr';
	import type { Event, Filter, Sub } from 'nostr-tools';
	import { onDestroy } from 'svelte';
	import { writable } from 'svelte/store';

	const searchQuery = writable('');

	let useNotes: Event[] = [];
	let sub: Sub | undefined;
	let end = false;
	let endtimer: NodeJS.Timeout;

	afterNavigate(() => {
		searchQuery.set($page.url.searchParams.get('q') || '');
	});

	const unsubscribe = searchQuery.subscribe((query) => {
		sub?.unsub();
		useNotes = [];

		if (!query) return;

		sub = subscribeEvents(1, { limit: 30, search: query } as Filter, '', [
			'wss://relay.nostr.band'
		]);
		sub.on('event', (event: Event) => {
			notes.set(event);
			useNotes = [...useNotes, event];
		});
	});

	let profileSub: Subscribe | undefined;

	const interval = setInterval(() => {
		getProfile(useNotes);
	}, 5 * 1000);

	onDestroy(() => {
		profileSub?.unsub();
		unsubscribe();
		clearInterval(interval);
		useNotes = [];
	});

	onDestroy(() => {
		sub?.unsub();
		clearInterval(endtimer);
		useNotes = [];
		unsubscribe();
	});
</script>

<Heading>検索</Heading>

<!-- <div class="mt-8 flex w-full">
	<Search />
</div> -->

<Section>
	<h3 class="text-2xl">{$searchQuery}</h3>
	{#if $searchQuery}
		<div class="mt-8 flex flex-col gap-4">
			{#key useNotes}
				{#if useNotes.length}
					{#each useNotes as note}
						<Note event={note} />
					{/each}
				{:else if !end}
					<Loading>Notes</Loading>
				{/if}
			{/key}
		</div>
		<p class="mt-8 text-right">
			{useNotes.length || 0}/30(max)
		</p>
	{/if}
</Section>
