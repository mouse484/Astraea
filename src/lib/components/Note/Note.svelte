<script lang="ts">
	import { goto } from '$app/navigation';
	import type { Event } from 'nostr-tools';
	import Button from '../elements/Button.svelte';
	import Profile from '../Profile/Profile.svelte';
	import Content from './Content.svelte';
	import Footer from './Footer.svelte';
	import NoteWithId from './NoteWithId.svelte';

	export let event: Event;
	export let isReply = false;

	let isWarn = event.tags.find(([type]) => type === 'content-warning')?.[1];

	const hasReply = event.tags.reverse().find(([type, , , marker]) => {
		return type === 'e' && (!marker || marker === 'reply');
	});
</script>

<div>
	{#if event}
		{#if !isReply && hasReply}
			{@const [, id] = hasReply}
			<NoteWithId {id} {isReply} />
		{/if}
		<div
			class="p-2 border rounded {isReply ? 'border-b-0 border-blue-800' : ''}"
			on:dblclick={() => goto(`/note/${event.id}`)}
		>
			<Profile pubkey={event.pubkey} detail={false} />
			<div class="mt-4">
				{#if isWarn}
					<Button on:click={() => (isWarn = undefined)}>
						このコンテンツを表示する (理由:{isWarn})
					</Button>
				{:else}
					<Content rawContent={event.content} tags={event.tags} />
				{/if}
			</div>
			<div class="flex justify-between mt-4">
				<Footer {event} />
				<div>
					{new Date(event.created_at * 1000).toLocaleString()}
				</div>
			</div>
		</div>
	{/if}
</div>
