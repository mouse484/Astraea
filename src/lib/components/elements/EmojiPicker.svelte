<script context="module" lang="ts">
	export type EmojiDate = {
		id: string;
		native?: string;
		shortcodes: string;
		src?: string;
	};
</script>

<script lang="ts">
	import data from '@emoji-mart/data';
	import { Picker } from 'emoji-mart';
	import i18nJa from '@emoji-mart/data/i18n/ja.json';
	import i18nEn from '@emoji-mart/data/i18n/en.json';
	import { createEventDispatcher } from 'svelte';
	import { locale } from 'svelte-i18n';

	const dispatch = createEventDispatcher<{ onEmojiSelect: EmojiDate }>();

	export let customEmoji:
		| {
				id: string;
				name: string;
				emojis: { id: string; name: string; keywords: string[]; skins: { src: string }[] }[];
		  }[]
		| undefined = undefined;
	export let position: 'right' | '' = '';

	export const emojiPicker = (node: HTMLElement, onEmojiSelect: (data: EmojiDate) => void) => {
		const picker = new Picker({
			data: data,
			onEmojiSelect,
			i18n: $locale === 'ja' ? i18nJa : i18nEn,
			custom: customEmoji || []
		});
		node.appendChild(picker as unknown as Node);
	};
</script>

<div
	class="absolute top-0 mt-8 pt-4 z-40 {position === 'right' ? 'right-0' : 0}"
	use:emojiPicker={(data) => {
		dispatch('onEmojiSelect', data);
	}}
/>
