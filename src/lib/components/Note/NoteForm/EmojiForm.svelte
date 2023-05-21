<script lang="ts">
	import { customEmojis, getCustomEmojis } from '$lib/store/customEmoji';
	import Icon from '$lib/components/elements/Icon.svelte';
	import { createEventDispatcher, onMount } from 'svelte';
	import { _ } from 'svelte-i18n';
	import EmojiPicker, { type EmojiDate } from '$lib/components/elements/EmojiPicker.svelte';

	const dispatch = createEventDispatcher<{ selectEmoji: EmojiDate }>();

	let isOpen = false;

	const onEmoji = (emoji: EmojiDate) => {
		dispatch('selectEmoji', emoji);
	};

	onMount(() => {
		getCustomEmojis();
	});
</script>

<div class="relative">
	<button on:click={() => (isOpen = !isOpen)}>
		<Icon iconset="material-symbols" name="add-reaction-outline" size="2" />
	</button>

	{#if isOpen}
		<EmojiPicker
			position="right"
			customEmoji={[
				{
					id: 'custom',
					name: 'Custom',
					emojis: [...$customEmojis.entries()].map(([code, url]) => ({
						id: code,
						name: code,
						keywords: [code],
						skins: [{ src: url }]
					}))
				}
			]}
			on:onEmojiSelect={(event) => {
				onEmoji(event.detail);
			}}
		/>
	{/if}
</div>
