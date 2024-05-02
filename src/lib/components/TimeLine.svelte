<script lang="ts">
	import { KIND, ndk } from '$lib/utils/nostr';
	import type { NDKEvent } from '@nostr-dev-kit/ndk';
	import Note from './Note/Note.svelte';

	const notes = $state<string[]>([]);

	$effect(() => {
		const subscription = ndk.subscribe({
			kinds: [KIND.Text]
		});
		subscription.on('event', (event: NDKEvent) => {
			notes.push(event.content);
		});
	});
</script>

<div>
	{#each notes as note}
		<Note content={note} />
	{/each}
</div>
