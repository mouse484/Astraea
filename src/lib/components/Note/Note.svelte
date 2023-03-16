<script lang="ts">
	import { goto } from '$app/navigation';
	import type { NoteInfo } from '$lib/data/notes';
	import type { Event } from 'nostr-tools';
	import Profile from '../Profile/Profile.svelte';
	import Content from './Content.svelte';

	import NoteFooter from './NoteFooter.svelte';

	export let note: NoteInfo;
	export let isReplay = false;
</script>

<div on:dblclick={() => goto(`/note/${note.event.id}`)}>
	<div class={`border p-4 rounded ${isReplay ? 'mt-0 border-t-0' : 'mt-4'}`}>
		{#if note.event.pubkey}
			<Profile npubHex={note.event.pubkey} />
		{/if}
		<div class="mt-4 max-h-96 overflow-scroll">
			<Content rawContent={note.event.content} event={note.event} />
		</div>
		<div class="mt-4 flex justify-between">
			<NoteFooter event={note.event} />
			{#if note.event.created_at}
				<div class="text-sm text-slate-600">
					{new Date(note.event.created_at * 1000).toLocaleString()}
				</div>
			{/if}
		</div>
	</div>
</div>
