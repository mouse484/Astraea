<script lang="ts">
	import { useRelays } from '$lib/nostr/pool';
	import { noteQuery } from '$lib/query/note';
	import { reactions } from '$lib/store/reactions';
	import type { Event } from 'nostr-tools';
	import { onDestroy } from 'svelte';
	import { writable } from 'svelte/store';
	import Emoji from '../elements/Emoji.svelte';
	import Profile from '../Profile/Profile.svelte';

	export let id: string;

	const useReactions = writable(new Map<string, Event>());

	const unsubscribe = reactions.subscribe((v) => {
		const react = v.get(id);
		if (react) {
			useReactions.update((uv) => {
				react.events.forEach((event) => {
					uv.set(event.id, event);
				});
				return uv;
			});
		}
	});

	$: note = noteQuery(id, useRelays('read'));

	$: event = $note.data;

	onDestroy(() => {
		unsubscribe();
	});
</script>

{#if event}
	<div class="border rounded p-2">
		<div class="flex justify-between">
			<Profile pubkey={event.pubkey} />
			<div class="text-sm">{new Date(event.created_at * 1000).toLocaleString()}</div>
		</div>
		<div class="mt-2">
			{event.content}
		</div>
		<div>
			<Emoji emoji="❤" />
			{#if $useReactions.size}
				{$useReactions.size}
			{/if}
		</div>
	</div>
{/if}
