<script lang="ts">
	import { get } from '$lib/utils/nostr';
	import type { Event } from 'nostr-tools';
	import Profile from '../Profile.svelte';
	import Content from './Content.svelte';

	export let note: Event;
	export let isReplay = false;
</script>

{#if !isReplay}
	{#each note.tags as a, index}
		{@const [type, id, , marker] = a}
		{#if type === 'e' && ((!marker && index >= 1) || marker === 'reply')}
			{#await get({ kinds: [1], ids: [id] }) then event}
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
		<div class="text-sm text-slate-600 text-right">
			{new Date(note.created_at * 1000).toLocaleString()}
		</div>
	</div>
</div>
