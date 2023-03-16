<script lang="ts">
	import { pubkey } from '$lib/data/setting';
	import { publish, subscribeEvents } from '$lib/utils/nostr';
	import Icon from '@iconify/svelte';
	import { getEventHash, type Event, type UnsignedEvent } from 'nostr-tools';

	export let event: Event;
	let reactions: string[] = [];
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

<div class="flex gap-2">
	<button on:click={likeEvent} disabled={liked}>
		<Icon icon="mdi:cards-heart-outline" color={liked ? 'red' : ''} />
	</button>
	{#key reactions}
		{#if reactions.length}
			<div>{reactions.length}</div>
		{/if}
	{/key}
</div>
