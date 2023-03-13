<script lang="ts">
	import Note from '$lib/components/Note/Note.svelte';
	import { getNote, notes, notesUpdater } from '$lib/data/notes';
	import { subscribe } from '$lib/utils/nostr';
	import Icon from '@iconify/svelte';
	import type { Event, Filter } from 'nostr-tools';
	import { onMount } from 'svelte';
	import NoteAndReplay from './Note/NoteAndReplay.svelte';

	export let authors: string[];
	export let filter: Omit<Filter, 'kinds' | 'authors'> = {};

	let isEose = false;

	onMount(async () => {
		const sub = subscribe({
			kinds: [1],
			authors,
			...filter
		});

		sub.on('event', (event: Event) => {
			if (event.tags) {
				const tag = event.tags.find(([type, , , marker]) => {
					return type === 'e' && (!marker || marker === 'reply');
				});

				if (tag) {
					const [, id] = tag;
					return notesUpdater(id, event, 'reply');
				}
			}
			return notesUpdater(event.id, event, 'root');
		});

		sub.on('eose', () => {
			isEose = true;
		});
	});

	$: useNotes = [...$notes.entries()]
		.filter(
			([, { root, reply }]) =>
				(root?.pubkey && authors.includes(root.pubkey)) ||
				[...(reply?.values() || [])].find((value) =>
					authors.includes(value.pubkey)
				)
		)
		.sort(([, { updated: a }], [, { updated: b }]) => (a < b ? 1 : -1));
</script>

{#if isEose}
	{#each useNotes as [id, { root, reply }] ([id])}
		<NoteAndReplay {id} {root} reply={reply && [...reply.values()]} />
	{/each}
{:else}
	<div class="flex flex-col items-center w-full">
		<Icon icon={'mdi:loading'} width={32} class="animate-spin" />
		<p class="mt-8">Loading Notes...</p>
	</div>
{/if}
