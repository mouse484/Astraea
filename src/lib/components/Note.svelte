<script lang="ts">
	import { nip04, nip19, type Event as relayEvent } from 'nostr-tools';
	import {
		contentClass,
		createdAtClass,
		descriptionClass,
		noteClass
	} from './Note.css';
	import { format } from 'prettier';
	import prettierBabel from 'prettier/parser-babel';
	import Profile from './Profile.svelte';
	import { goto } from '$app/navigation';

	import { formatContent } from '$lib/utils/formatContent';
	import { relayPool, relays } from '$lib/data/relay';

	export let note: relayEvent;

	// let jsonVisable = false;

	const formatJson = (): string => {
		return format(JSON.stringify(note), {
			parser: 'json-stringify',
			plugins: [prettierBabel]
		});
	};

	const isEventTag = (type: string) => {
		return type === 'e';
	};
	const getNote = async (eventId: string) => {
		const [id] = eventId.split(',');
		if (nip19.noteEncode(id))
			return await $relayPool.get($relays, { ids: [id] });
	};
</script>

{#if note}
	{#if note.tags}
		{#each note.tags as [type, value]}
			{#if isEventTag(type)}
				{#await getNote(value)}
					loading
				{:then note}
					<svelte:self {note} />
				{/await}
			{/if}
		{/each}
	{/if}
	<div
		class={noteClass}
		on:dblclick={() => goto(`/note/${note.id}`)}
		on:keypress={() => goto(`/note/${note.id}`)}
	>
		<div class={descriptionClass}>
			<Profile npubHex={note.pubkey} />
			<div class={createdAtClass}>
				{new Date(note.created_at * 1000).toLocaleString()}
			</div>
		</div>

		<div class={contentClass}>
			{@html formatContent(note.content)}
		</div>
	</div>
{/if}

<!-- <button on:click={() => (jsonVisable = !jsonVisable)}>view json</button>
		{#if jsonVisable}
			<div>{formatJson()}</div>
		{/if} -->
