<script lang="ts">
	import { useNDK } from '$lib/stores/nostr.svelte';
	import { NDKEvent, NDKKind } from '@nostr-dev-kit/ndk';
	import VirtualScroll from 'svelte-virtual-scroll-list';
	import Note from './Note/Note.svelte';

	const { ids }: { ids?: string[] } = $props();

	const notes = $state<NDKEvent[]>([]);

	$effect(() => {
		const ndk = useNDK();
		const subscription = ndk.subscribe({
			kinds: [NDKKind.Text],
			authors: ids,
			limit: 50
		});
		subscription.on('event', (event: NDKEvent) => {
			notes.unshift(event);
		});
		return () => {
			subscription.stop();
		};
	});
</script>

<div class="h-full border-(1 gray-600 solid)">
	<VirtualScroll data={notes} key="id" keeps={10} let:data>
		<Note event={data} />
	</VirtualScroll>
</div>

<style>
	div :global(.virtual-scroll-root) {
		scrollbar-width: none;
	}
	div :global(.virtual-scroll-root::-webkit-scrollbar) {
		display: none;
	}
</style>
