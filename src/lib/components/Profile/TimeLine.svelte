<!-- これ共通化するから消す /timeline -->

<script lang="ts">
	import { relayPool } from '$lib/utils/relay';
	import type { Event as relayEvent } from 'nostr-tools';
	import { onMount } from 'svelte';
	import Note from '../Note.svelte';

	export let hexId: string;

	// limitのあとで実装
	let limit: number = 10;
	let notes: relayEvent[] = [];

	onMount(() => {
		relayPool
			.subscribe(1, { authors: [hexId], limit: limit - 1 })
			.on((event) => {
				notes = [
					event,
					...new Map(notes.map((value) => [value.id, value])).values()
				].sort((a, b) => b.created_at - a.created_at);
			});
	});
</script>

{#if notes}
	{#each notes as note}
		<Note {note} />
	{/each}
{/if}
