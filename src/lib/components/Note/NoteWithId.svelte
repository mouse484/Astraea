<script lang="ts">
	import { notes } from '$lib/store/notes';
	import Note from './Note.svelte';

	export let id: string;
	export let isReply = false;

	let event = notes.get(id);
</script>

{#if event}
	<Note {event} {isReply} />
{:else}
	<a class="block p-2 text-blue-400 rounded border" href="/note/{id}">
		note:{id.substring(0, 8)}...
	</a>
{/if}
