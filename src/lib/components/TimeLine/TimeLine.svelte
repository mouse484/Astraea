<script lang="ts">
	import { subscribeEvents } from '$lib/nostr/pool';
	import { getQueryClient } from '$lib/query/util';
	import { reactions } from '$lib/store/reactions';
	import type { Event, Filter, Sub } from 'nostr-tools';
	import { onDestroy, onMount } from 'svelte';
	import { writable } from 'svelte/store';
	import Note from '../Note/Note.svelte';

	const queryClient = getQueryClient();

	const notes = writable<Event[]>([]);

	export let relays: string[];
	export let contacts: string[];
	export let filter: Filter = {};

	let sub: Sub | undefined = undefined;

	onMount(() => {
		sub = subscribeEvents(1, { authors: contacts, limit: 100, ...filter }, relays);
		sub.on('event', (event) => {
			notes.set([...$notes, event]);
			queryClient.setQueryData(['note', event.id], event);
		});
	});

	$: noteIds = $notes.sort((a, b) => b.created_at - a.created_at).map((event) => event.id);

	let reactionsub: Sub | undefined = undefined;
	let notNew = false;
	let saveIds = 0;
	$: {
		if (noteIds.length && !notNew && saveIds !== noteIds.length) {
			reactionsub?.unsub();
			setTimeout(() => {
				notNew = false;
			}, 5 * 1000);
			notNew = true;
			reactionsub = subscribeEvents(
				7,
				{
					'#e': noteIds
				},
				relays
			);
			reactionsub.on('event', (event) => {
				reactions.set(event);
			});
		}
	}

	onDestroy(() => {
		sub?.unsub();
		reactionsub?.unsub();
	});
</script>

<div class="flex flex-col gap-4">
	{#each noteIds as note (note)}
		<Note id={note} />
	{/each}
</div>
