<script lang="ts">
	import { notes } from '$lib/store/notes';
	import { subscribeEvents } from '$lib/utils/nostr';
	import type { Event } from 'nostr-tools';
	import { onDestroy, onMount } from 'svelte';
	import Note from './Note/Note.svelte';

	export let authors: string[];

	onMount(() => {
		const sub = subscribeEvents(1, { limit: 30, authors });
		sub.on('event', (event) => {
			notes.set(event);
		});
	});

	let useNotes: Event[];

	const unsubscribe = notes.subscribe(() => {
		useNotes = notes
			.filter('pubkey', authors)
			.sort((a, b) => b.created_at - a.created_at);
	});

	onDestroy(() => {
		unsubscribe();
	});
</script>

{#key useNotes}
	{#each useNotes as event (event.id)}
		<Note {event} />
	{/each}
{/key}
