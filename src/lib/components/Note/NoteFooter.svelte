<script lang="ts">
	import Icon from '@iconify/svelte';
	import type { Event } from 'nostr-tools';
	import PublishPost from '../PublishPost.svelte';
	import Like from './Like.svelte';

	export let note: Event;

	let isReplayOpen = false;
</script>

<div>
	<div class="flex gap-4">
		<div class="flex">
			<button
				on:click={() => {
					isReplayOpen = !isReplayOpen;
				}}
			>
				<Icon icon="mdi:message-outline" />
			</button>
		</div>
		<Like {note} />
	</div>
	{#if isReplayOpen}
		<div class="mt-4">
			<PublishPost
				replyFor={note.id}
				on:status={(status) => {
					if (status.detail) {
						isReplayOpen = false;
					}
				}}
			/>
		</div>
	{/if}
</div>
