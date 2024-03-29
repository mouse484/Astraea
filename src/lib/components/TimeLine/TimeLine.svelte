<script lang="ts">
	import Note from '$lib/components/Note/Note.svelte';
	import { subscribeEvents } from '$lib/nostr/pool';
	import { getQueryClient } from '$lib/query/util';
	import { reactions } from '$lib/store/reactions';
	import type { Event, Filter, Kind, Sub } from 'nostr-tools';
	import { onDestroy, onMount } from 'svelte';
	import VirtualScroll from 'svelte-virtual-scroll-list';
	import { writable } from 'svelte/store';

	const queryClient = getQueryClient();

	type TLEvent = Event & { repost: string | undefined };

	const notes = writable(new Map<string, TLEvent>());

	export let relays: string[];
	export let authors: string[] | 'ALL';
	export let limit: number = 100;
	export let filter: Filter = {};

	let sub: Sub | undefined = undefined;

	onMount(() => {
		const subFilter = { limit, ...filter };
		if (authors !== 'ALL') {
			subFilter.authors = authors;
		}
		sub = subscribeEvents([1, 6, 7], subFilter, relays);
		sub.on('event', (event) => {
			if (event.kind === 7) {
				return reactions.set(event);
			}
			const isRepost = event.kind === (6 as Kind);
			const tlEvent: TLEvent = {
				...(isRepost ? JSON.parse(event.content) : event),
				repost: isRepost ? event.pubkey : undefined
			};
			const current = $notes.get(tlEvent.id);
			notes.update((n) => n.set(tlEvent.id, current ? { ...current, ...tlEvent } : tlEvent));
			queryClient.setQueryData(['note', tlEvent.id], tlEvent);
		});
	});

	$: notelists = [...$notes.values()].sort((a, b) => b.created_at - a.created_at);

	onDestroy(() => {
		sub?.unsub();
	});
</script>

<div class="h-slot">
	<VirtualScroll data={notelists} key="id" keeps={10} let:data>
		<div slot="header" class="pb-4">
			<slot />
		</div>
		{@const { id, repost } = data}
		<div class="mt-4">
			<Note {id} {repost} />
		</div>
	</VirtualScroll>
</div>
