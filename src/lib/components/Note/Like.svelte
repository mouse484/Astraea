<script lang="ts">
	import { notes } from '$lib/data/notes';
	import { pubkey } from '$lib/data/setting';
	import { publish } from '$lib/utils/nostr';
	import Icon from '@iconify/svelte';
	import { getEventHash, type Event, type UnsignedEvent } from 'nostr-tools';

	export let note: Event;
	$: reactions = $notes.get(note.id)?.root?.reactions || [];
	let liked = false;

	const likeEvent = async () => {
		if (!window.nostr) return;

		const unsignedEvent: UnsignedEvent = {
			kind: 7,
			created_at: Math.floor(Date.now() / 1000),
			tags: [
				['p', note.pubkey, ''],
				['e', note.id, '']
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

	$: hasMereaction = reactions && reactions.includes($pubkey);
</script>

<div class="flex gap-2">
	<button on:click={likeEvent} disabled={liked || hasMereaction}>
		{#if hasMereaction}
			<Icon icon="mdi:cards-heart" color="red" />
		{:else}
			<Icon icon="mdi:cards-heart-outline" color={liked ? 'red' : ''} />
		{/if}
	</button>
	{#key reactions}
		{#if reactions.length}
			<div>{reactions.length}</div>
		{/if}
	{/key}
</div>
