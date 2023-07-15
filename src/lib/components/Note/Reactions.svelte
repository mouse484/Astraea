<script lang="ts">
	import { publishEvent } from '$lib/nostr/pool';
	import { useRelays } from '$lib/nostr/relays';
	import { pubkey } from '$lib/store/pubkey';
	import { reactions } from '$lib/store/reactions';
	import type { Event, UnsignedEvent } from 'nostr-tools';
	import { onDestroy } from 'svelte';
	import { writable } from 'svelte/store';
	import Emoji from '../elements/Emoji.svelte';
	import EmojiForm from './NoteForm/EmojiForm.svelte';

	export let event: Event;

	const displayReactions = writable(new Map<string, Map<string, Event>>());
	const displayCustomEmoji = writable(new Map<string, string>());
	const writeRelays = useRelays('write');
	const pubCustomEmojis = writable(new Map<string, string>());

	const unsubscribe = reactions.subscribe((v) => {
		const react = v.get(event.id);
		if (react) {
			displayReactions.update((ud) => {
				react.events.forEach((event) => {
					const current = ud.get(event.content);
					if (event.content.startsWith(':')) {
						const tag = event.tags.find(
							([key, code]) => key === 'emoji' && `:${code}:` === event.content
						);
						if (tag) {
							const [, , url] = tag;
							displayCustomEmoji.update((u) => u.set(event.content, url));
						}
					}
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
		const tags: string[][] = [
			['p', event.pubkey, ''],
			['e', event.id, '']
		];
		if ($pubCustomEmojis.size) {
			[...$pubCustomEmojis.entries()].forEach(([code, url]) => {
				tags.push(['emoji', code, url]);
			});
		}
		const unsignedEvent: UnsignedEvent = {
			kind: 7,
			created_at: Math.floor(Date.now() / 1000),
			tags,
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
					{#if reaction.startsWith(':')}
						<img src={$displayCustomEmoji.get(reaction)} alt={reaction} class="h-4 w-4" />
					{:else}
						<Emoji emoji={reaction.replace('+', '❤')} />
					{/if}
					<span>{items.size}</span>
				</div>
			</button>
		{/each}
	{/if}
	<EmojiForm
		size="1"
		on:selectEmoji={({ detail }) => {
			if (!detail.native) {
				pubCustomEmojis.update((v) => v.set(detail.id, detail.src || ''));
			}
			const emoji = detail.native || detail.shortcodes;
			if (emoji) reactPublish(emoji);
		}}
	/>
</div>
