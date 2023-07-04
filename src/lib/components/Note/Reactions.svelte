<script lang="ts">
	import { reactions } from '$lib/store/reactions';
	import { onDestroy } from 'svelte';
	import { writable } from 'svelte/store';
	import Emoji from '../elements/Emoji.svelte';
	import type { Event, UnsignedEvent } from 'nostr-tools';
	import { pubkey } from '$lib/store/pubkey';
	import { publishEvent } from '$lib/nostr/pool';
	import Icon from '@iconify/svelte';
	import EmojiPicker from '../elements/EmojiPicker.svelte';
	import { useRelays } from '$lib/nostr/relays';

	export let event: Event;

	const displayReactions = writable(new Map<string, Map<string, Event>>());
	const writeRelays = useRelays('write');

	let isOpenEmojiPicker = false;

	const unsubscribe = reactions.subscribe((v) => {
		const react = v.get(event.id);
		if (react) {
			displayReactions.update((ud) => {
				react.events.forEach((event) => {
					const current = ud.get(event.content);
					ud.set(event.content, (current ? current : new Map()).set(event.id, event));
				});
				return ud;
			});
		}
	});

	const isHasOwnReaction = (items: Map<string, Event>) => {
		return [...items.values()].findIndex((v) => v.pubkey === $pubkey) === -1 ? false : true;
	};

	const reactPublish = (content: string) => {
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
		publishEvent(unsignedEvent, writeRelays);
	};

	onDestroy(() => {
		unsubscribe();
	});
</script>

<div class="flex gap-2">
	{#if $displayReactions}
		{#each [...$displayReactions.entries()] as [reaction, items]}
			{@const hasOwnReaction = isHasOwnReaction(items)}
			<button on:click={() => reactPublish(reaction)} disabled={hasOwnReaction}>
				<div
					class="[&>.emoji]:h-4 flex gap-2 items-center rounded px-1
        {hasOwnReaction ? 'bg-info' : ''}"
				>
					<Emoji emoji={reaction.replace('+', '❤')} />
					<span>{items.size}</span>
				</div>
			</button>
		{/each}
	{/if}
	<div class="flex items-center relative">
		<button on:click={() => (isOpenEmojiPicker = !isOpenEmojiPicker)}>
			<Icon icon="material-symbols:add-reaction-outline" />
		</button>
		{#if isOpenEmojiPicker}
			<EmojiPicker
				on:onEmojiSelect={(event) => {
					isOpenEmojiPicker = false;
					if (event.detail.native) reactPublish(event.detail.native);
				}}
			/>
		{/if}
	</div>
</div>
