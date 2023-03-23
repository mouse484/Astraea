<script context="module" lang="ts">
	export type EmojiDate = { [key in 'native' | 'id']: string };
</script>

<script lang="ts">
	import data from '@emoji-mart/data';
	import { Picker } from 'emoji-mart';
	import i18nJa from '@emoji-mart/data/i18n/ja.json';
	import i18nEn from '@emoji-mart/data/i18n/en.json';
	import { createEventDispatcher } from 'svelte';
	import { locale } from 'svelte-i18n';

	const dispatch = createEventDispatcher<{ onEmojiSelect: EmojiDate }>();

	export const emojiPicker = (
		node: HTMLElement,
		onEmojiSelect: (data: EmojiDate) => void
	) => {
		const picker = new Picker({
			data,
			onEmojiSelect,
			i18n: $locale === 'ja' ? i18nJa : i18nEn
		});
		node.appendChild(picker as unknown as Node);
	};
</script>

<div
	class="absolute top-0 mt-8"
	use:emojiPicker={(data) => {
		dispatch('onEmojiSelect', data);
	}}
/>
