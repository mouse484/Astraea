<script lang="ts">
	import type { Event } from 'nostr-tools';
	import AwaitNote from './AwaitNote.svelte';
	import Note from './Note.svelte';

	export let id: string;
	export let root: Event | undefined = undefined;
	export let reply: Event[] = [];
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
