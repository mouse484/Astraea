<script lang="ts">
	import Note from '$lib/components/Note.svelte';
	import { relayPool } from '$lib/utils/relay';
	import type { Event } from 'nostr-tools';
	import { onMount } from 'svelte';
	import type { PageData } from './$types';
	import type { response } from './+page';

	export let data: PageData;

	let { noteId } = data as response;

	let note: Event;

	onMount(() => {
		if (!noteId) return;
		relayPool.subscribe(1, { ids: [noteId] }).on((event) => {
			note = { ...note, ...event };
		});
	});
</script>

{#key note}
	<Note {note} />
{/key}
