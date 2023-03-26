<script lang="ts">
	import { notes } from '$lib/store/notes';
	import Note from './Note.svelte';

	export let id: string;

	let event = notes.get(id);
</script>

{#if event}
	<Note {event} />
{:else}
	<a class="p-2 rounded border block text-blue-400" href="/note/{id}">
		note:{id.substring(0, 8)}...
	</a>
{/if}
