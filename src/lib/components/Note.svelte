<script lang="ts">
	import type { Event as relayEvent } from 'nostr-tools';
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

	export let note: relayEvent;

	// let jsonVisable = false;

	const formatJson = (): string => {
		return format(JSON.stringify(note), {
			parser: 'json-stringify',
			plugins: [prettierBabel]
		});
	};
</script>

{#if note}
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

		<div class={contentClass}>{note.content}</div>
	</div>
{/if}

<!-- <button on:click={() => (jsonVisable = !jsonVisable)}>view json</button>
		{#if jsonVisable}
			<div>{formatJson()}</div>
		{/if} -->
