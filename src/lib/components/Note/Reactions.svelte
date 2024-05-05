<script lang="ts">
	import { reactions, type ReactionEvents } from '$lib/stores/reactions.svelte';
	import { NDKKind, type NDKEvent } from '@nostr-dev-kit/ndk';
	import EmojiPIcker from '../EmojiPIcker.svelte';
	import { userStore } from '$lib/stores/user.svelte';

	const { note }: { note: NDKEvent } = $props();

	let useReactionList = $state<[string, ReactionEvents][]>([]);

	$effect(() => {
		useReactionList = [...(reactions.reactions.get(note.id) || [])];
		reactions.subscribe(note.id, (reactionList) => {
			useReactionList = [...reactionList];
		});
		return () => {
			reactions.unsubscribe(note.id);
		};
	});

	$effect(() => {
		const { ndk } = note;
		if (!ndk) return;
		const subscription = ndk.subscribe({
			kinds: [NDKKind.Reaction],
			'#e': [note.id]
		});
		subscription.on('event', (event: NDKEvent) => {
			reactions.addReaction(event);
		});
		return () => {
			subscription.stop();
		};
	});
</script>

<div class="flex flex-wrap items-center gap-2">
	<EmojiPIcker {note} />
	{#each useReactionList as [emoji, events] (emoji)}
		{@const isUserReacted = [...events.values()].find(
			(event) => event.pubkey === userStore().pubkey
		)}
		<button
			class={[
				'border-(1 gray) rounded px-1 text-0.8em',
				isUserReacted ? 'bg-sky-300' : 'bg-transparent'
			].join(' ')}
			disabled={isUserReacted}
			onclick={() => {
				note.react(emoji);
			}}
		>
			<span class="emoji">{emoji.replace('+', '❤')}</span>
			<span class={isUserReacted ? 'text-reverse' : ''}>
				{events.size > 1 ? ` ${events.size}` : ''}
			</span>
		</button>
	{/each}
</div>

<style>
	.emoji {
		/* emoji-picker --emoji-font-family */
		font-family: 'Twemoji Mozilla', 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol',
			'Noto Color Emoji', 'EmojiOne Color', 'Android Emoji', sans-serif;
	}
</style>
