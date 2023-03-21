<script lang="ts">
	import { reactions } from '$lib/store/reactions';
	import { pubkey } from '$lib/store/setting';
	import { publishEvent } from '$lib/utils/nostr';
	import { twemoji } from '$lib/utils/twemoji';
	import Icon from '@iconify/svelte';
	import { json } from '@sveltejs/kit';
	import type { Event, UnsignedEvent } from 'nostr-tools';
	import { onDestroy } from 'svelte';
	import Emoji from '../Emoji.svelte';
	import EmojiPicker, { type EmojiDate } from '../EmojiPicker.svelte';

	export let event: Event;
	let isOpenEmojiPicker = false;
	let useReactions: { [key: string]: string[] } = {};

	$: hasMyReactions = Object.entries(useReactions).flatMap(
		([reaction, pubkeys]) => (pubkeys.includes($pubkey) ? reaction : [])
	);

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

	const reactPublish = (content: string) => {
		if (hasMyReactions.includes(content))
			return console.warn('重複リアクションしない');
		const unsignedEvent: UnsignedEvent = {
			kind: 7,
			created_at: Math.floor(Date.now() / 1000),
			tags: [
				['p', event.pubkey, ''],
				['e', event.id, '']
			],
			content: content,
			pubkey: $pubkey
		};
		publishEvent(unsignedEvent);
	};

	const onEmojiSelect = (data: EmojiDate) => {
		isOpenEmojiPicker = false;
		reactPublish(data.native);
	};
</script>

<div class="flex gap-2">
	{#if useReactions}
		{#each Object.entries(useReactions) as [reaction, count]}
			{@const isMyReaction = hasMyReactions.includes(reaction)}
			<button on:click={() => reactPublish(reaction)} disabled={!!isMyReaction}>
				<div
					class="[&>.emoji]:h-4 flex gap-2 items-center rounded px-1
					{isMyReaction ? 'bg-blue-200' : ''}"
				>
					<Emoji emoji={reaction.replace('+', '❤')} />
					<span>{count.length}</span>
				</div>
			</button>
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
