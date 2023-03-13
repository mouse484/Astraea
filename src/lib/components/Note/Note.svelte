<script lang="ts">
	import { goto } from '$app/navigation';
	import type { Event } from 'nostr-tools';
	import Profile from '../Profile.svelte';
	import Content from './Content.svelte';

	import NoteFooter from './NoteFooter.svelte';

	export let note: Event;
	export let isReplay = false;

	const noteClick = () => {
		const selection = window.getSelection()?.toString();
		if (!selection) {
			goto(`/note/${note.id}`);
		}
	};
</script>

<!-- svelte-ignore a11y-click-events-have-key-events -->
<div
	class={`border p-4 rounded ${isReplay ? 'mt-0 border-t-0' : 'mt-4'}`}
	on:click={noteClick}
>
	{#if note.pubkey}
		<Profile npubHex={note.pubkey} />
	{/if}
	<div class="mt-4">
		<Content rawContent={note.content} event={note} />
	</div>
	<div class="mt-4 flex justify-between">
		<NoteFooter event={note} />
		{#if note.created_at}
			<div class="text-sm text-slate-600">
				{new Date(note.created_at * 1000).toLocaleString()}
			</div>
		{/if}
	</div>
</div>
