<script lang="ts">
	import { nostr } from '$lib/stores/nostr.svelte';
	import { NDKEvent, NDKKind } from '@nostr-dev-kit/ndk';
	import VirtualScroll from 'svelte-virtual-scroll-list';
	import Note from './Note/Note.svelte';
	import Icon from './elements/Icon.svelte';
	import { reactions } from '$lib/stores/reactions.svelte';

	const { ids }: { ids?: string[] } = $props();

	let isLoading = $state(true);
	let notes = $state<NDKEvent[]>([]);

	$effect(() => {
		const { ndk } = nostr;
		if (!ndk) return;
		const subscription = ndk.subscribe({
			kinds: [NDKKind.Text, NDKKind.Reaction],
			authors: ids,
			limit: 100
		});
		subscription.on('event', (event: NDKEvent) => {
			if (event.kind === NDKKind.Reaction) {
				reactions.addReaction(event);
				return;
			}
			notes.push(event);
			notes.sort((a, b) => b.created_at! - a.created_at!);
		});
		subscription.on('eose', () => {
			isLoading = false;
		});
		return () => {
			subscription.stop();
			notes = [];
			isLoading = true;
		};
	});
</script>

<div class="h-full border-(1 gray-600 solid)">
	{#if isLoading}
		<div class="grid h-4/5 animate-spin place-items-center">
			<Icon name="loading" />
		</div>
	{:else}
		<VirtualScroll data={notes} key="id" keeps={10} let:data>
			<Note note={data} />
		</VirtualScroll>
	{/if}
</div>

<style>
	div :global(.virtual-scroll-root) {
		scrollbar-width: none;
	}
	div :global(.virtual-scroll-root::-webkit-scrollbar) {
		display: none;
	}
</style>
