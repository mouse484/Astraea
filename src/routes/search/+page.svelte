<script lang="ts">
	import { afterNavigate } from '$app/navigation';
	import { page } from '$app/stores';
	import Loading from '$lib/components/elements/Loading.svelte';
	import Note from '$lib/components/Note/Note.svelte';
	import Search from '$lib/components/Search.svelte';
	import { subscribeEvents } from '$lib/utils/nostr';
	import type { Event, Filter, Sub } from 'nostr-tools';
	import { onDestroy } from 'svelte';
	import { writable } from 'svelte/store';

	const searchQuery = writable('');

	let notes: Event[] = [];
	let sub: Sub | undefined;
	let end = false;
	let endtimer: NodeJS.Timeout;

	afterNavigate(() => {
		searchQuery.set($page.url.searchParams.get('q') || '');
	});

	const unsubscribe = searchQuery.subscribe((query) => {
		let length = notes.length;

		sub?.unsub();
		clearInterval(endtimer);
		notes = [];

		if (!query) return;

		sub = subscribeEvents({ kinds: [1], search: query, limit: 30 } as Filter, [
			'wss://relay.nostr.band'
		]);
		sub.on('event', (event: Event) => {
			notes = [...notes, event];
		});
	});

	onDestroy(() => {
		sub?.unsub();
		clearInterval(endtimer);
		notes = [];
		unsubscribe();
	});
</script>

<h2 class="text-2xl">検索</h2>

<div class="mt-8 flex w-full">
	<Search />
</div>

<section class="mt-8">
	<h3 class="text-2xl">{$searchQuery}</h3>
	{#if $searchQuery}
		{#key notes}
			{#if notes.length}
				{#each notes as note}
					<Note {note} />
				{/each}
			{:else if !end}
				<Loading>Notes</Loading>
			{/if}
		{/key}
		<p class="mt-8 text-right">
			{notes.length || 0}/30(max)
		</p>
	{/if}
</section>
