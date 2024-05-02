<script lang="ts">
	import { KIND, ndk } from '$lib/utils/nostr';
	import type { NDKEvent } from '@nostr-dev-kit/ndk';
	import VirtualScroll from 'svelte-virtual-scroll-list';
	import Note from './Note/Note.svelte';

	const notes = $state<NDKEvent[]>([]);

	$effect(() => {
		const subscription = ndk.subscribe({
			kinds: [KIND.Text],
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

<div class="h-screen">
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
