<script lang="ts">
	import { notes } from '$lib/data/notes';
	import { get } from '$lib/utils/nostr';
	import type { Event } from 'nostr-tools';
	import Profile from '../Profile.svelte';
	import Content from './Content.svelte';

	import NoteFooter from './NoteFooter.svelte';

	export let note: Event;
	export let isReplay = false;

	const getNote = async (id: string) => {
		return new Promise(async (resolve, reject) => {
			const note = $notes.get(id);
			if (note) {
				resolve(note);
			} else {
				const event = await get({ kinds: [1], ids: [id] });
				if (event) {
					notes.update((updater) => updater.set(id, event));
					resolve(event);
				} else {
					reject();
				}
			}
		});
	};
</script>

{#if !isReplay}
	{#each note.tags as tag}
		{@const [type, id, , marker] = tag}
		{#if type === 'e' && (!marker || marker === 'reply')}
			{#await getNote(id) then event}
				<svelte:self note={event} isReplay={true} />
			{/await}
		{/if}
	{/each}
{/if}
<div class={`border p-4 rounded ${isReplay ? 'mb-0 border-b-0' : 'mb-4'}`}>
	{#if note.pubkey}
		<Profile npubHex={note.pubkey} />
	{/if}
	<div class="mt-4">
		<Content rawContent={note.content} event={note} />
	</div>
	<div class="mt-4 flex justify-between">
		<NoteFooter eventID={note.id} />
		{#if note.created_at}
			<div class="text-sm text-slate-600">
				{new Date(note.created_at * 1000).toLocaleString()}
			</div>
		{/if}
	</div>
</div>
