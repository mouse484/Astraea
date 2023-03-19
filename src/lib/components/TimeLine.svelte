<script lang="ts">
	import { notes } from '$lib/store/notes';
	import { subscribeEvents } from '$lib/utils/nostr';
	import { onMount } from 'svelte';
	import Note from './Note/Note.svelte';

	export let authors: string[];

	let useNotes = new Set<string>();

	onMount(() => {
		const sub = subscribeEvents(1, { limit: 30, authors });
		sub.on('event', (event) => {
			notes.set(event);
			useNotes = useNotes.add(event.id);
		});
	});
</script>

{#key useNotes}
	{#each [...useNotes] as noteId (noteId)}
		<Note {noteId} />
	{/each}
{/key}
