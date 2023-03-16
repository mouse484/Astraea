<script lang="ts">
	import { afterNavigate, goto } from '$app/navigation';
	import { page } from '$app/stores';
	import Button from '$lib/components/elements/Button.svelte';
	import Note from '$lib/components/Note/Note.svelte';
	import { subscribeEvents } from '$lib/utils/nostr';
	import type { Event, Filter } from 'nostr-tools';

	let searchInput: string = '';
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

<form class="mt-8" action="/search">
	<input class="p-2" type="text" name="q" value={searchInput} />
	<Button type="submit">検索</Button>
</form>

<section class="mt-8">
	{#key notes}
		{#each notes as note}
			<Note {note} />
		{/each}
	{/key}
</section>
