<script lang="ts">
	import { reactions } from '$lib/store/reactions';
	import { pubkey } from '$lib/store/setting';
	import { publishEvent } from '$lib/utils/nostr';
	import { twemoji } from '$lib/utils/twemoji';
	import Icon from '@iconify/svelte';
	import { json } from '@sveltejs/kit';
	import type { Event, UnsignedEvent } from 'nostr-tools';
	import { onDestroy } from 'svelte';
	import EmojiPicker, { type EmojiDate } from '../EmojiPicker.svelte';

	export let event: Event;
	let liked = false;
	let isOpenEmojiPicker = false;
	let useReactions: { [key: string]: string[] } = {};

	const unsubscribe = reactions.subscribe((events) => {
		[...events.values()].flatMap((e) => {
			const [, id] = e.tags.find(([type]) => type === 'e') || [];
			if (id === event.id) {
				const newReaction = useReactions;
				newReaction[e.content] = useReactions[e.content]
					? [...new Set(useReactions[e.content]).add(e.pubkey)]
					: [e.pubkey];

				useReactions = newReaction;
			}
		});
	});

	onDestroy(() => {
		unsubscribe();
	});

	const onEmojiSelect = async (data: EmojiDate) => {
		isOpenEmojiPicker = false;
		const unsignedEvent: UnsignedEvent = {
			kind: 7,
			created_at: Math.floor(Date.now() / 1000),
			tags: [
				['p', event.pubkey, ''],
				['e', event.id, '']
			],
			content: data.native,
			pubkey: $pubkey
		};
		await publishEvent(unsignedEvent);
	};
</script>

<div class="flex gap-2">
	{#if useReactions}
		{#each Object.entries(useReactions) as [reaction, count]}
			<div class="flex gap-2">
				<div class="[&>.emoji]:h-4 flex gap-2 items-center" use:twemoji>
					{reaction.replace('+', '❤')}
					<div>{count.length}</div>
				</div>
			</div>
		{/each}
	{/if}
	<div class="flex items-center relative">
		<button on:click={() => (isOpenEmojiPicker = !isOpenEmojiPicker)}>
			<Icon icon="material-symbols:add-reaction-outline" />
		</button>
		{#if isOpenEmojiPicker}
			<EmojiPicker on:onEmojiSelect={(event) => onEmojiSelect(event.detail)} />
		{/if}
	</div>
</div>
