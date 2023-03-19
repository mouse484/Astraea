<script lang="ts">
	import type { Event } from 'nostr-tools';
	import Profile from '../Profile/Profile.svelte';
	import Content from './Content.svelte';
	import Footer from './Footer.svelte';
	import NoteWithId from './NoteWithId.svelte';

	export let event: Event;

	const isReply = event.tags.reverse().find(([type, , , marker]) => {
		return type === 'e' && (!marker || marker === 'reply');
	});
</script>

<div>
	{#if event}
		{#if isReply}
			{@const [, id] = isReply}
			<NoteWithId {id} />
		{/if}
		<div class="border p-2 rounded {isReply ? 'border-t-0' : ''}">
			<Profile pubkey={event.pubkey} detail={false} />
			<div class="mt-4">
				<Content rawContent={event.content} tags={event.tags} />
			</div>
			<div class="mt-4 flex justify-between">
				<Footer {event} />
				<div>
					{new Date(event.created_at * 1000).toLocaleString()}
				</div>
			</div>
		</div>
	{/if}
</div>
