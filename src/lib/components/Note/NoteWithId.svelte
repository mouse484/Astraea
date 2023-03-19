<script lang="ts">
	import { notes } from '$lib/store/notes';
	import Note from './Note.svelte';

	export let id: string;

	let event = notes.get(id);
</script>

{#if event}
	<Note {event} />
{/if}
