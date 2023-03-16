<script lang="ts">
	import { afterNavigate, goto } from '$app/navigation';
	import { page } from '$app/stores';
	import Note from '$lib/components/Note/Note.svelte';
	import Search from '$lib/components/Search.svelte';
	import { subscribeEvents } from '$lib/utils/nostr';
	import type { Event, Filter } from 'nostr-tools';

	let notes: Event[] = [];

	afterNavigate(() => {
		const searchQuery = $page.url.searchParams.get('q');
		if (!searchQuery) return;
		notes = [];
		const sub = subscribeEvents({ search: searchQuery, limit: 20 } as Filter, [
			'wss://relay.nostr.band'
		]);
		sub.on('event', (event: Event) => {
			notes = [...notes, event];
		});
	});
</script>

<h2 class="text-2xl">検索</h2>

<div class="mt-8 flex w-full">
	<Search />
</div>

<section class="mt-8">
	{#key notes}
		{#each notes as note}
			<Note {note} />
		{/each}
	{/key}
</section>
