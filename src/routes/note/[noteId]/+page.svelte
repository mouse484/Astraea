<script lang="ts">
	import NoteAndReplay from '$lib/components/Note/NoteAndReplay.svelte';
	import type { PageData } from './$types';

	export let data: PageData;

	$: noteId = data.noteId;
</script>

{#if noteId}
	<NoteAndReplay id={noteId} />
{/if}
