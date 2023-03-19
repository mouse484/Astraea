<script lang="ts">
	import { notes } from '$lib/store/notes';
	import { getProfile } from '$lib/store/profiles';
	import { subscribeEvents, type Subscribe } from '$lib/utils/nostr';
	import type { Event, Filter } from 'nostr-tools';
	import { onDestroy, onMount } from 'svelte';
	import Note from './Note/Note.svelte';

	export let authors: string[] | 'ALL';
	export let filter: Filter = {};
	export let relays: string[] = [];

	let useNotes: Event[];

	const unsubscribe = notes.subscribe(() => {
		useNotes = (
			authors === 'ALL' ? notes.list() : notes.filter('pubkey', authors)
		).sort((a, b) => b.created_at - a.created_at);
	});

	let profileSub: Subscribe | undefined;

	const interval = setInterval(() => {
		const sub = getProfile(useNotes);
		if (sub) profileSub = sub;
	}, 5 * 1000);

	onMount(() => {
		const usefilter = { limit: 30, ...filter };
		if (authors !== 'ALL' && authors.length) {
			usefilter.authors = authors;
		}

		const sub = subscribeEvents(1, usefilter, '', relays);
		sub.on('event', (event) => {
			console.log('v');
			notes.set(event);
		});
	});

	onDestroy(() => {
		profileSub?.unsub();
		unsubscribe();
		clearInterval(interval);
		useNotes = [];
	});
</script>

<div class="flex flex-col gap-4">
	{#each useNotes as event (event.id)}
		<Note {event} />
	{/each}
</div>
