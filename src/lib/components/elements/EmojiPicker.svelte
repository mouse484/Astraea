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
	import i18nEn from '@emoji-mart/data/i18n/en.json';
	import i18nJa from '@emoji-mart/data/i18n/ja.json';
	import { Picker } from 'emoji-mart';
	import { createEventDispatcher, onMount } from 'svelte';
	import { locale } from 'svelte-i18n';

	import { flip, offset, shift } from '@floating-ui/core';
	import { createFloatingActions } from 'svelte-floating-ui';

	const dispatch = createEventDispatcher<{ onEmojiSelect: EmojiDate }>();

	export let customEmoji:
		| {
				id: string;
				name: string;
				emojis: { id: string; name: string; keywords: string[]; skins: { src: string }[] }[];
		  }[]
		| undefined = undefined;

	let emojiPicker:
		| ((node: HTMLElement, onEmojiSelect: (data: EmojiDate) => void) => void)
		| undefined = undefined;

	const [floatingRef, floatingContent] = createFloatingActions({
		strategy: 'absolute',
		placement: 'bottom-end',
		middleware: [offset(6), flip(), shift()]
	});

	onMount(() => {
		emojiPicker = (node, onEmojiSelect) => {
			const picker = new Picker({
				data: data,
				onEmojiSelect,
				i18n: $locale === 'ja' ? i18nJa : i18nEn,
				custom: customEmoji || []
			});
			node.appendChild(picker as unknown as Node);
		};
	});
</script>

<div use:floatingRef />

{#if emojiPicker}
	<div
		class="absolute"
		use:floatingContent
		use:emojiPicker={(data) => {
			dispatch('onEmojiSelect', data);
		}}
	/>
{/if}
