<script lang="ts">
	import { pubkey } from '$lib/data/setting';
	import { publish } from '$lib/utils/nostr';
	import Icon from '@iconify/svelte';
	import { getEventHash, type Event, type UnsignedEvent } from 'nostr-tools';
	import PublishPost from '../PublishPost.svelte';

	export let event: Event;

	let isReplayOpen = false;
	let liked = false;

	const likeEvent = async () => {
		if (!window.nostr) return;

		const unsignedEvent: UnsignedEvent = {
			kind: 7,
			created_at: Math.floor(Date.now() / 1000),
			tags: [
				['p', event.pubkey, ''],
				['e', event.id, '']
			],
			content: '+',
			pubkey: $pubkey
		};
		const likeEvent = await window.nostr.signEvent({
			id: getEventHash(unsignedEvent),
			...unsignedEvent
		});
		const result = await publish(likeEvent);
		if (result.status === 'ok') {
			console.info('Like: Published');
			liked = true;
		} else {
			console.error(`Like: fail-${result.reason}`);
		}
	};
</script>

<div>
	<div class="flex gap-4">
		<button
			on:click={() => {
				isReplayOpen = !isReplayOpen;
			}}
		>
			<Icon icon="mdi:message-outline" />
		</button>
		<button on:click={likeEvent} disabled={liked}>
			<Icon icon="mdi:cards-heart-outline" color={liked ? 'red' : ''} />
		</button>
	</div>
	{#if isReplayOpen}
		<div class="mt-4">
			<PublishPost
				replyFor={event.id}
				on:status={(status) => {
					if (status.detail) {
						isReplayOpen = false;
					}
				}}
			/>
		</div>
	{/if}
</div>
