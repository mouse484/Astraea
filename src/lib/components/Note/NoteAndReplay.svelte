<script lang="ts">
	import { getNote } from '$lib/data/notes';
	import type { Event } from 'nostr-tools';
	import Note from './Note.svelte';

	export let id: string;
	export let root: Event | undefined = undefined;
	export let reply: Event[] = [];
</script>

{#if root}
	<Note note={root} />
{:else}
	{#await getNote(id)}
		<p>Loading...</p>
	{:then event}
		<Note note={event} />
	{:catch}
		<a class="text-blue-600 visited:text-purple-600" href="/note/{id}">
			note:{id.substring(0, 8)}..
		</a>
	{/await}
{/if}
{#if reply}
	{#each reply as event}
		<Note note={event} isReplay={true} />
	{/each}
{/if}
