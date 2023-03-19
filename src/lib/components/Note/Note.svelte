<script lang="ts">
	import { notes } from '$lib/store/notes';

	export let noteId: string;

	const note = notes.get(noteId);
</script>

{#if note}
	<p>
		{note.content}
	</p>
{/if}
