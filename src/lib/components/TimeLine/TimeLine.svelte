<script lang="ts">
	import { subscribeEvents, useRelays } from '$lib/nostr/pool';
	import type { Event, Filter } from 'nostr-tools';
	import { onMount } from 'svelte';

	let notes: Event[] = [];

	export let relays: string[];
	export let contacts: string[];
	export let filter: Filter = {};

	onMount(() => {
		const sub = subscribeEvents(1, { authors: contacts, limit: 100, ...filter }, relays);
		sub.on('event', (event: Event) => {
			notes = [...notes, event].sort((a, b) => b.created_at - a.created_at);
		});
	});
</script>

{#each notes as note (note.id)}
	<p>
		{note.content}
	</p>
{/each}
