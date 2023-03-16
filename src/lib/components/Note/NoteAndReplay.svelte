<script lang="ts">
	import { notes, type NoteInfo } from '$lib/data/notes';
	import AwaitNote from './AwaitNote.svelte';
	import Note from './Note.svelte';

	export let id: string;

	$: note = $notes.get(id);
</script>

{#if note?.root}
	<Note note={note.root} />
{:else}
	<AwaitNote {id} />
{/if}
{#if note?.reply}
	{#each [...note.reply.values()] as noteInfo}
		<Note note={noteInfo} isReplay={true} />
	{/each}
{/if}
