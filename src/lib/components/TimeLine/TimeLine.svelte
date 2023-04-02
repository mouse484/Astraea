<script lang="ts">
	import { pool } from '$lib/nostr/pool';
	import { getQueryClient } from '$lib/query/util';
	import { reactions } from '$lib/store/reactions';
	import type { Event, Filter } from 'nostr-tools';
	import { onDestroy, onMount } from 'svelte';
	import { writable } from 'svelte/store';
	import Note from '../Note/Note.svelte';

	const queryClient = getQueryClient();

	const notes = writable<Event[]>([]);

	export let relays: string[];
	export let contacts: string[];
	export let filter: Filter = {};

	let unsub: () => void;

	onMount(() => {
		unsub = pool.subscribe(
			[{ kinds: [1], authors: contacts, limit: 100, ...filter }],
			relays,
			(event) => {
				notes.set([...$notes, event]);
				queryClient.setQueryData(['note', event.id], event);
			}
		);
	});

	$: noteIds = $notes.sort((a, b) => b.created_at - a.created_at).map((event) => event.id);

	let reactionsUnsub: (() => void) | undefined = undefined;
	let notNew = false;
	let saveIds = 0;
	$: {
		if (noteIds.length && !notNew && saveIds !== noteIds.length) {
			reactionsUnsub?.();
			setTimeout(() => {
				notNew = false;
			}, 5 * 1000);
			notNew = true;
			reactionsUnsub = pool.subscribe(
				[
					{
						kinds: [7],
						'#e': noteIds
					}
				],
				relays,
				(event) => {
					reactions.set(event);
				}
			);
		}
	}

	onDestroy(() => {
		unsub();
		reactionsUnsub?.();
	});
</script>

<div class="flex flex-col gap-4">
	{#each noteIds as note (note)}
		<Note id={note} />
	{/each}
</div>
