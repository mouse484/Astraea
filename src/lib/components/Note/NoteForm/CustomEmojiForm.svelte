<script lang="ts">
	import { customEmojis, getCustomEmojis } from '$lib/store/customEmoji';
	import Icon from '$lib/components/elements/Icon.svelte';
	import { createEventDispatcher, onMount } from 'svelte';
	import { _ } from 'svelte-i18n';
	import EmojiPicker from '$lib/components/elements/EmojiPicker.svelte';
	import { identity } from 'svelte/internal';

	export let emojis: [string, string, string][];

	const dispatch = createEventDispatcher<{ selectEmoji: string }>();

	let isOpen = false;

	const onEmoji = (ev: Event, code: string) => {
		const target = ev.target as HTMLInputElement;
		if (target.checked) dispatch('selectEmoji', `:${code}:`);
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
					name: 'custom',
					emojis: [...$customEmojis.entries()].map(([code, url]) => ({
						id: code,
						name: code,
						keywords: [code],
						skins: [{ src: url }]
					}))
				}
			]}
			on:onEmojiSelect={(event) => {
				console.log(event);
			}}
		/>
	{/if}
</div>
