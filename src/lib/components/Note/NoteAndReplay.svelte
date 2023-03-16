<script lang="ts">
	import type { NoteInfo } from '$lib/data/notes';
	import AwaitNote from './AwaitNote.svelte';
	import Note from './Note.svelte';

	export let id: string;
	export let root: NoteInfo | undefined = undefined;
	export let reply: NoteInfo[] = [];
</script>

{#if root}
	<Note note={root} />
{:else}
	<AwaitNote {id} />
{/if}
{#if reply}
	{#each reply as event}
		<Note note={event} isReplay={true} />
	{/each}
{/if}
