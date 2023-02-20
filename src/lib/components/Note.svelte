<script lang="ts">
	import { nip04, nip19, type Event as relayEvent } from 'nostr-tools';
	import {
		contentClass,
		createdAtClass,
		defaultNoteClass,
		descriptionClass,
		withReplayNoteClass
	} from './Note.css';
	import { format } from 'prettier';
	import prettierBabel from 'prettier/parser-babel';
	import Profile from './Profile.svelte';
	import { goto } from '$app/navigation';

	import { formatContent } from '$lib/utils/formatContent';
	import { relayPool, relays } from '$lib/data/relay';

	export let note: relayEvent;
	export let isReplay = false;

	// let jsonVisable = false;

	const formatJson = (): string => {
		return format(JSON.stringify(note), {
			parser: 'json-stringify',
			plugins: [prettierBabel]
		});
	};

	// https://github.com/nostr-protocol/nips/blob/master/10.md#marked-e-tags-preferred
	type eTag = [string, string, string, 'reply' | 'root' | 'mention'];

	const isReplayTag = (tag: string[]) => {
		const [type, id, , maker] = tag as eTag;
		console.log(maker);
		return (
			type === 'e' &&
			(!maker || ['reply', 'root'].includes(maker)) &&
			nip19.noteEncode(id)
		);
	};
	const getNote = async (tag: string[]) => {
		const [, id] = tag as eTag;
		return await $relayPool.get($relays, { ids: [id] });
	};
</script>

{#if note}
	{#if !isReplay && note.tags}
		{#each note.tags as tag}
			{#if isReplayTag(tag)}
				{#await getNote(tag) then note}
					{#key note}
						<svelte:self {note} isReplay={true} />
					{/key}
				{/await}
			{/if}
		{/each}
	{/if}
	<div
		class={isReplay ? withReplayNoteClass : defaultNoteClass}
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
