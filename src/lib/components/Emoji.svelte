<script lang="ts">
	import data from '@emoji-mart/data';
	import { init, getEmojiDataFromNative } from 'emoji-mart';
	import type { EmojiDate } from './EmojiPicker.svelte';

	init({ data });

	export let emoji: string;

	let emojiData: EmojiDate;

	getEmojiDataFromNative(emoji).then((e) => {
		emojiData = e;
	});
</script>

{#if emojiData}
	<svelte:element this={'em-emoji'} id={emojiData.id} />
{/if}
