<script lang="ts">
	import AwaitNote from '$lib/components/Note/AwaitNote.svelte';
	import Profile from '$lib/components/Profile/Profile.svelte';
	import { pubkey } from '$lib/data/setting';
	import { subscribe } from '$lib/utils/nostr';
	import Icon from '@iconify/svelte';
	import type { Event } from 'nostr-tools';
	import { onMount } from 'svelte';
	import { writable } from 'svelte/store';

	// Map<通知先id, Map<id,[pubkey,content(emoji)]>>
	const items = writable(new Map<string, Map<string, [string, string]>>());

	onMount(() => {
		const sub = subscribe({ kinds: [7], '#p': [$pubkey], limit: 20 });

		sub.on('event', (event: Event) => {
			const noticeForEvent = event.tags.find(([type]) => type === 'e');
			if (!noticeForEvent) return;
			const [, id] = noticeForEvent;
			items.update((item) => {
				const current = item.get(id) || new Map<string, [string, string]>();
				return item.set(
					id,
					current.set(event.id, [event.pubkey, event.content])
				);
			});
		});
	});
</script>

<h2>通知</h2>
<div class="flex flex-col">
	{#each [...$items.entries()] as [id, item]}
		<div class="flex">
			{#each [...item.values()] as [pubkey, content]}
				<div class="flex">
					<Profile npubHex={pubkey} imageOnly={true} />
					<p>
						{#if content === '+'}
							<Icon icon="mdi:cards-heart" color={'red'} />
						{:else}
							{content}
						{/if}
					</p>
				</div>
			{/each}
		</div>
		<AwaitNote {id} />
	{/each}
</div>
