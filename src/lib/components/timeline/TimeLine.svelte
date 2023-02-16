<script lang="ts">
	import { contacts } from '$lib/data/profile';
	import { relayPool, relays } from '$lib/data/relay';
	import { decodeKey } from '$lib/utils/key';
	import type { Event as relayEvent } from 'nostr-tools';
	import { onMount } from 'svelte';
	import Note from '../Note.svelte';

	export let pubkey: string;

	let notes: relayEvent[] = [];
	$: ids = $contacts.map(([, id]) => id);

	onMount(() => {
		const id = decodeKey('npub', pubkey);
		if (!id) return;
		const subs = $relayPool.sub($relays, [
			{
				authors: ids,
				kinds: [1],
				limit: 20,
				until: Math.round(Date.now() / 1000)
			}
		]);

		subs.on('event', (event: relayEvent) => {
			console.log(event.content);
			notes = [...notes, event];
		});

		subs.on('eose', () => {
			subs.unsub();
			notes = [
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
