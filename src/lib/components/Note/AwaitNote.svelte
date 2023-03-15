<script lang="ts">
	import { getNote } from "$lib/data/notes";
	import Note from "./Note.svelte";


	export let id: string;
</script>

{#await getNote(id)}
	<p>Loading...</p>
{:then event}
	<Note note={event} />
{:catch}
	<a class="text-blue-600 visited:text-purple-600" href="/note/{id}">
		note:{id.substring(0, 8)}..
	</a>
{/await}
