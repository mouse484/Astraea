<script lang="ts">
	import Profile from '$lib/components/Profile/Profile.svelte';
	import Emoji from '$lib/components/elements/Emoji.svelte';

	import Main from '$lib/components/Main.svelte';
	import Note from '$lib/components/Note/Note.svelte';
	import { subscribeEvents } from '$lib/nostr/pool';
	import { useRelays } from '$lib/nostr/relays';
	import { pubkey } from '$lib/store/pubkey';
	import { reactions } from '$lib/store/reactions';
	import type { Sub } from 'nostr-tools';
	import { onDestroy, onMount } from 'svelte';
	import { _ } from 'svelte-i18n';
	import { writable } from 'svelte/store';

	const items = writable(new Map<string, [{ [key: string]: string[] }, number]>());
	const displayCustomEmoji = writable(new Map<string, string>());

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
				if (e.content.startsWith(':')) {
					const tag = e.tags.find(([key, code]) => key === 'emoji' && `:${code}:` === e.content);
					if (tag) {
						const [, , url] = tag;
						displayCustomEmoji.update((u) => u.set(e.content, url));
					}
				}
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

<Main title={$_('notifications.notifications')}>
	<virtual-list>
		{#each noticeItems as { id, value } (id)}
			<virtual-list-item>
				<div class="mt-4">
					{#each Object.entries(value) as [emoji, users] (emoji)}
						<div class="flex flex-wrap">
							{#if emoji.startsWith(':')}
								<img src={$displayCustomEmoji.get(emoji)} alt={emoji} class="h-4 w-4" />
							{:else}
								<Emoji emoji={emoji.replace('+', '❤')} />
							{/if}
							{#each users as pubkey (pubkey)}
								<Profile {pubkey} imageOnly={true} />
							{/each}
						</div>
					{/each}
					<div class="mt-2 min-h-16">
						<Note {id} isReply={false} />
					</div>
				</div>
			</virtual-list-item>
		{/each}
	</virtual-list>
</Main>
