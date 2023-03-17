<script lang="ts">
	import { getEvent, subscribeEvents } from '$lib/utils/nostr';
	import type { Event } from 'nostr-tools';
	import { onMount } from 'svelte';
	import { writable } from 'svelte/store';

	export let pubkey: string;

	type badgeType = {
		d: string;
		name?: string;
		description?: string;
		image?: string;
		thumb?: string;
	};

	const badges = writable(new Map<string, badgeType>());

	onMount(async () => {
		const event = await getEvent({ kinds: [30008], authors: [pubkey] });
		const authors = new Set<string>();
		const names = new Set<string>();
		event.tags.forEach(([type, id]) => {
			if (type === 'a') {
				const [, author, name] = id.split(':');
				authors.add(author);
				names.add(name);
			}
		});
		const sub = subscribeEvents({
			kinds: [30009],
			authors: [...authors],
			'#d': [...names]
		});
		sub.on('event', (event: Event) => {
			const value: badgeType = { d: '' };
			(event.tags as [keyof badgeType, string][]).forEach(([type, content]) => {
				value[type] = content;
			});
			badges.update((b) => b.set(event.id, value));
			console.log(event);
		});
		sub.on('eose', () => {
			sub.unsub();
		});
	});
</script>

<div class="flex flex-wrap gap-4">
	{#key badges}
		{#each [...$badges.values()] as badge}
			<div class="flex items-center w-12">
				<img src={badge.image} alt={badge.d} />
			</div>
		{/each}
	{/key}
</div>
