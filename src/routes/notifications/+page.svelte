<script lang="ts">
	import Heading from '$lib/components/elements/Heading.svelte';
	import Section from '$lib/components/elements/Section.svelte';
	import Profile from '$lib/components/Profile/Profile.svelte';
	import Emoji from '$lib/components/elements/Emoji.svelte';

	import Note from '$lib/components/Note/Note.svelte';
	import { pubkey } from '$lib/store/pubkey';
	import { reactions } from '$lib/store/reactions';
	import { onDestroy, onMount } from 'svelte';
	import { _ } from 'svelte-i18n';
	import { writable } from 'svelte/store';
	import { subscribeEvents } from '$lib/nostr/pool';
	import type { Sub } from 'nostr-tools';
	import { useRelays } from '$lib/nostr/relays';
	import VirtualScroll from 'svelte-virtual-scroll-list';

	const items = writable(new Map<string, [{ [key: string]: string[] }, number]>());

	const relays = useRelays('read');
	let sub: Sub;

	onMount(() => {
		sub = subscribeEvents(7, { '#p': [$pubkey] }, relays);
		sub.on('event', (event) => {
			reactions.set(event);
		});
	});

	const unsubscribe = reactions.subscribe((events) => {
		[...events.values()].forEach(({ events: reactEvents, lastUpdate }) => {
			reactEvents.forEach((e) => {
				const [, reactPubkey] = e.tags.find(([type]) => type === 'p') || [];
				const [, reactEventId] = e.tags.find(([type]) => type === 'e') || [];
				if (reactPubkey === $pubkey) {
					const [current, update = 0] = $items.get(reactEventId) || [];
					const newReaction = current || {};

					newReaction[e.content] = current?.[e.content]
						? [...new Set(current[e.content]).add(e.pubkey)]
						: [e.pubkey];
					items.update((r) =>
						r.set(reactEventId, [newReaction, update > lastUpdate ? update : lastUpdate])
					);
				}
			});
		});
	});

	onDestroy(() => {
		unsubscribe();
		sub.unsub();
	});

	$: noticeItems = [...$items.entries()]
		.sort(([, [, a]], [, [, b]]) => b - a)
		.map(([id, [value]]) => ({ id, value }));

	type itemType = {
		id: string;
		value: {
			[key: string]: string[];
		};
	};
	const isItemType = (item: unknown): item is itemType => {
		return typeof item === 'object';
	};
</script>

<Heading>{$_('notifications.notifications')}</Heading>

<Section className="h-[90vh]">
	<VirtualScroll data={noticeItems} keeps={8} key="id"  let:data>
		{#if isItemType(data)}
			{@const { id, value } = data}
			<div class="mt-4">
				{#each Object.entries(value) as [emoji, users] (emoji)}
					<div class="flex flex-wrap">
						<Emoji emoji={emoji.replace('+', '❤')} />
						{#each users as pubkey (pubkey)}
							<Profile {pubkey} imageOnly={true} />
						{/each}
					</div>
				{/each}
				<div class="mt-2">
					<Note {id} isReply={false} />
				</div>
			</div>
		{/if}
	</VirtualScroll>
</Section>
