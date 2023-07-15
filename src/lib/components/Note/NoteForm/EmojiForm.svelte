<script lang="ts">
	import EmojiPicker, { type EmojiDate } from '$lib/components/elements/EmojiPicker.svelte';
	import Icon from '$lib/components/elements/Icon.svelte';
	import { customEmojis, getCustomEmojis } from '$lib/store/customEmoji';
	import { createEventDispatcher, onMount } from 'svelte';

	const dispatch = createEventDispatcher<{ selectEmoji: EmojiDate }>();

	export let size: '1' | '2' = '2';

	let isOpen = false;

	const emojis = [...$customEmojis.entries()].map(([code, url]) => ({
		id: code,
		name: code,
		keywords: [code],
		skins: [{ src: url }]
	}));

	const onEmoji = (emoji: EmojiDate) => {
		dispatch('selectEmoji', emoji);
	};

	onMount(() => {
		getCustomEmojis();
	});
</script>

<div class="relative">
	<button on:click={() => (isOpen = !isOpen)}>
		<Icon iconset="material-symbols" name="add-reaction-outline" {size} />
	</button>

	{#if isOpen}
		<EmojiPicker
			customEmoji={[
				{
					id: 'custom',
					name: 'Custom',
					emojis: emojis
				}
			]}
			on:onEmojiSelect={(event) => {
				onEmoji(event.detail);
			}}
		/>
	{/if}
</div>
