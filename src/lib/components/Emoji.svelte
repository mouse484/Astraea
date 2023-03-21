<script lang="ts">
	import data from '@emoji-mart/data';
	import { init, getEmojiDataFromNative, Emoji } from 'emoji-mart';
	import { onMount } from 'svelte';
	import type { EmojiDate } from './EmojiPicker.svelte';

	export let emoji: string;

	let emojiData: EmojiDate;
	onMount(async () => {
		await init({ data });
		emojiData = await getEmojiDataFromNative(emoji);
	});
</script>

{#if emojiData}
	<svelte:element this={'em-emoji'} id={emojiData.id} />
{/if}
