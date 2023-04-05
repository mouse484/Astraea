<script lang="ts">
	import { reactions } from '$lib/store/reactions';
	import { onDestroy } from 'svelte';
	import { writable } from 'svelte/store';
	import Emoji from '../elements/Emoji.svelte';
	import type { Event } from 'nostr-tools';
	import { pubkey } from '$lib/store/pubkey';

	export let id: string;

	const displayReactions = writable(new Map<string, Map<string, Event>>());

	const unsubscribe = reactions.subscribe((v) => {
		const react = v.get(id);
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

	const hasOwnReaction = (items: Map<string, Event>) => {
		return [...items.values()].findIndex((v) => v.pubkey === $pubkey) === -1 ? false : true;
	};

	onDestroy(() => {
		unsubscribe();
	});
</script>

<div class="flex max-w-max overflow-x-scroll">
	{#if $displayReactions}
		{#each [...$displayReactions.entries()] as [reaction, items]}
			<div
				class="[&>.emoji]:h-4 flex gap-2 items-center rounded px-1
        {hasOwnReaction(items) ? 'bg-blue-200' : ''}"
			>
				<Emoji emoji={reaction.replace('+', '❤')} />
				<span>{items.size}</span>
			</div>
		{/each}
	{/if}
</div>
