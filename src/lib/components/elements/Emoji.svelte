<script lang="ts">
	import data from '@emoji-mart/data';
	import { init, getEmojiDataFromNative } from 'emoji-mart';
	import { onMount } from 'svelte';

	export let emoji: string;

	let emojiData: { id: string };
	onMount(async () => {
		await init({ data });
		emojiData = await getEmojiDataFromNative(emoji);
	});
</script>

{#if emojiData}
	<svelte:element this={'em-emoji'} id={emojiData.id} />
{/if}
