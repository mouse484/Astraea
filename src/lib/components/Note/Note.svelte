<script lang="ts">
	import { useRelays } from '$lib/nostr/relays';
	import { noteQuery } from '$lib/query/note';
	import Icon from '@iconify/svelte';
	import Profile from '../Profile/Profile.svelte';
	import NoteContent from './NoteContent.svelte';
	import Reactions from './Reactions.svelte';
	import NoteFooter from './NoteFooter.svelte';

	export let id: string;
	export let isReply = false;
	export let repost: string | undefined = undefined;

	$: note = noteQuery(id, useRelays('read'));

	$: event = $note.data;

	$: hasReply = event?.tags.reverse().find(([type, , , marker]) => {
		return type === 'e' && (!marker || marker === 'reply');
	});
</script>

{#if event}
	<div>
		{#if !isReply && hasReply}
			<svelte:self id={hasReply[1]} isReplay={true} />
		{/if}
		{#if repost && !!repost.length}
			<div class="flex items-center mb-2">
				<div class="text-3xl">
					<Icon icon="mdi:repeat" />
				</div>
				<Profile pubkey={repost} imageOnly={true} />
			</div>
		{/if}
		<div
			class="border rounded p-2 flex-col flex gap-2 {isReply ? 'border-b-0 border-blue-800' : ''}"
		>
			<div class="flex justify-between">
				<Profile pubkey={event.pubkey} />
				<div class="text-sm">{new Date(event.created_at * 1000).toLocaleString()}</div>
			</div>
			<NoteContent rawContent={event.content} />
			<NoteFooter {id} />
		</div>
	</div>
{/if}
