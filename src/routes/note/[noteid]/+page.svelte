<script lang="ts">
	import Note from '$lib/components/Note.svelte';
	import { relayPool, relays } from '$lib/data/relay';
	import type { Event } from 'nostr-tools';
	import { onMount } from 'svelte';
	import type { PageData } from './$types';
	import type { response } from './+page';

	export let data: PageData;

	let { noteId } = data as response;

	let note: Event;

	onMount(() => {
		console.log(noteId);
		if (!noteId) return;
		const subs = $relayPool.sub($relays, [{ kinds: [1], ids: [noteId] }]);

		subs.on('event', (event: Event) => {
			note = { ...note, ...event };
		});

		subs.on('eose', () => subs.unsub());
	});
</script>

{#key note}
	<Note {note} />
{/key}
