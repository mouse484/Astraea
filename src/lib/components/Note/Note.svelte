<script lang="ts">
	import { goto } from '$app/navigation';
	import type { Event } from 'nostr-tools';
	import Button from '../elements/Button.svelte';
	import Profile from '../Profile/Profile.svelte';
	import Content from './Content.svelte';
	import Footer from './Footer.svelte';
	import NoteWithId from './NoteWithId.svelte';

	export let event: Event;

	let isWarn = event.tags.find(([type]) => type === 'content-warning')?.[1];

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
		<div
			class="border p-2 rounded {isReply ? 'border-t-0' : ''}"
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
			<div class="mt-4 flex justify-between">
				<Footer {event} />
				<div>
					{new Date(event.created_at * 1000).toLocaleString()}
				</div>
			</div>
		</div>
	{/if}
</div>
