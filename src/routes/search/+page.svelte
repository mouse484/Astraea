<script lang="ts">
	import { afterNavigate, goto } from '$app/navigation';
	import { page } from '$app/stores';
	import Note from '$lib/components/Note/Note.svelte';
	import Search from '$lib/components/Search.svelte';
	import { subscribeEvents } from '$lib/utils/nostr';
	import type { Event, Filter } from 'nostr-tools';

	let notes: Event[] = [];
	let searchQuery: string;
	let eose = false;

	afterNavigate(() => {
		searchQuery = $page.url.searchParams.get('q') || '';
		if (!searchQuery) return;
		notes = [];
		const sub = subscribeEvents(
			{ kinds: [1], search: searchQuery, limit: 20 } as Filter,
			['wss://relay.nostr.band']
		);
		sub.on('event', (event: Event) => {
			notes = [...notes, event];
		});
		sub.on('eose', () => {
			eose = true;
			sub.unsub();
		});
	});
</script>

<h2 class="text-2xl">検索</h2>

<div class="mt-8 flex w-full">
	<Search searchInput={searchQuery} />
</div>

<section class="mt-8">
	{#key notes}
		{#each notes as note}
			<Note {note} />
		{/each}
	{/key}
	{#if eose}
		{#if notes.length}
			<p class="mt-8 text-right">{notes.length}</p>
		{:else}
			<p>見つかりませんでした</p>
		{/if}
	{/if}
</section>
