<script lang="ts">
	import { afterNavigate, goto } from '$app/navigation';
	import { page } from '$app/stores';
	import Loading from '$lib/components/elements/Loading.svelte';
	import Note from '$lib/components/Note/Note.svelte';
	import Search from '$lib/components/Search.svelte';
	import { subscribeEvents } from '$lib/utils/nostr';
	import type { Event, Filter } from 'nostr-tools';
	import { onDestroy } from 'svelte';

	let notes: Event[] = [];
	let searchQuery: string;
	let end = false;
	let endtimer: NodeJS.Timeout;

	afterNavigate(() => {
		searchQuery = $page.url.searchParams.get('q') || '';
		if (!searchQuery) return;
		notes = [];
		const sub = subscribeEvents(
			{ kinds: [1], search: searchQuery, limit: 30 } as Filter,
			['wss://relay.nostr.band']
		);
		sub.on('event', (event: Event) => {
			notes = [...notes, event];
		});
		sub.on('eose', () => {
			let length = notes.length;
			const endtimer = setInterval(() => {
				if (length === notes.length) {
					end = true;
					sub.unsub();
					clearInterval(endtimer);
				} else {
					length = notes.length;
				}
			}, 5000);
		});
	});

	onDestroy(() => {
		clearInterval(endtimer);
	});
</script>

<h2 class="text-2xl">検索</h2>

<div class="mt-8 flex w-full">
	<Search bind:searchInput={searchQuery} />
</div>

<section class="mt-8">
	{#if searchQuery}
		{#key notes}
			{#if notes.length}
				{#each notes as note}
					<Note {note} />
				{/each}
			{:else if !end}
				<Loading>Notes</Loading>
			{/if}
		{/key}
		{#if end}
			<p class="mt-8 text-right">
				{#if notes.length}
					{notes.length}/30(max)
				{:else}
					見つかりませんでした
				{/if}
			</p>
		{/if}
	{/if}
</section>
