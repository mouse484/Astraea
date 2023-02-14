<script lang="ts">
	import type { Event as relayEvent } from 'nostr-tools';
	import { descriptionClass } from './Note.css';
	import { format } from 'prettier';
	import prettierBabel from 'prettier/parser-babel';
	import Profile from './Profile.svelte';

	export let note: relayEvent;

	// let jsonVisable = false;

	const formatJson = (): string => {
		return format(JSON.stringify(note), {
			parser: 'json-stringify',
			plugins: [prettierBabel]
		});
	};
</script>

<div>
	<Profile pubkey={note.pubkey}/>
	<div>{note.content}</div>
	<div class={descriptionClass}>
		<div>
			{new Date(note.created_at * 1000).toLocaleString()}
		</div>
		<!-- <button on:click={() => (jsonVisable = !jsonVisable)}>view json</button>
		{#if jsonVisable}
			<div>{formatJson()}</div>
		{/if} -->
	</div>
</div>
