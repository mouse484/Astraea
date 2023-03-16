<script lang="ts">
	import type { NoteInfo } from '$lib/data/notes';
	import { pubkey } from '$lib/data/setting';
	import { publish } from '$lib/utils/nostr';
	import Icon from '@iconify/svelte';
	import { getEventHash, type UnsignedEvent } from 'nostr-tools';

	export let note: NoteInfo;
	$: reactions = note.reactions || [];
	let liked = false;

	const likeEvent = async () => {
		if (!window.nostr) return;

		const unsignedEvent: UnsignedEvent = {
			kind: 7,
			created_at: Math.floor(Date.now() / 1000),
			tags: [
				['p', note.event.pubkey, ''],
				['e', note.event.id, '']
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
