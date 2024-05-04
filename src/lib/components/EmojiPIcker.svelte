<script lang="ts">
	import type { NDKEvent } from '@nostr-dev-kit/ndk';
	import Icon from './elements/Icon.svelte';

	const { note }: { note: NDKEvent } = $props();

	let pickerElement = $state<HTMLDivElement>();
	let isOpen = $state(false);

	const openPicker = async () => {
		const { Picker } = await import('emoji-picker-element');
		const picker = new Picker();

		picker.addEventListener('emoji-click', (event) => {
			const emoji = event.detail.unicode;

			if (emoji) {
				note.react(emoji);

				isOpen = false;
				picker.remove();
			}
		});

		pickerElement?.appendChild(picker);
	};

	$effect(() => {
		if (isOpen) {
			openPicker();
		}
	});
</script>

<div class="relative">
	<button onclick={() => (isOpen = !isOpen)} class="bg-transparent">
		<Icon iconset="material-symbols" name="add-reaction-outline" size="1" />
	</button>

	{#if isOpen}
		<div bind:this={pickerElement} class="absolute top-4 z-10"></div>
	{/if}
</div>
