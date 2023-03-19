<script lang="ts">
	import { pubkey } from '$lib/store/setting';
	import { publishEvent } from '$lib/utils/nostr';
	import Icon from '@iconify/svelte';
	import type { Event, UnsignedEvent } from 'nostr-tools';

	export let event: Event;
	let liked = false;

	const likeEvent = async () => {
		console.log('like');

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
		const pub = await publishEvent(unsignedEvent);
		pub?.on('ok', () => {
			liked = true;
		});
	};

	// $: hasMeReaction =
	// 	reactions && !reactions.findIndex((r) => r.pubkey === $pubkey);
</script>

<div class="flex gap-2">
	<button on:click={likeEvent} disabled={liked}>
		<!-- {#if hasMeReaction}
			<Icon icon="mdi:cards-heart" color="red" />
		{:else} -->
		<Icon icon="mdi:cards-heart-outline" color={liked ? 'red' : ''} />
		<!-- {/if} -->
	</button>
	<!-- {#key reactions}
		{#if reactions.length}
			<div>{reactions.length}</div>
		{/if}
	{/key} -->
</div>
