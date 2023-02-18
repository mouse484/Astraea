<script lang="ts">
	import { contacts } from '$lib/data/profile';
	import { relayPool, relays } from '$lib/data/relay';
	import { decodeKey } from '$lib/utils/key';
	import type { Event as relayEvent } from 'nostr-tools';
	import { onMount } from 'svelte';
	import Note from '../Note.svelte';

	let notes: relayEvent[] = [];
	$: ids = $contacts.map(([, id]) => id);

	onMount(async () => {
		const events = await $relayPool.list($relays, [
			{
				authors: ids,
				kinds: [1],
				limit: 20,
				until: Math.round(Date.now() / 1000)
			}
		]);

		notes = [
			...new Map(events.map((value) => [value.id, value])).values()
		].sort((a, b) => b.created_at - a.created_at);
	});
</script>

{#if notes}
	{#each notes as note}
		<Note {note} />
	{/each}
{/if}
