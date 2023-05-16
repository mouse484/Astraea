<script lang="ts">
	import { customEmojis, getCustomEmojis } from '$lib/store/customEmoji';
	import { onMount } from 'svelte';

	export let emojis: [string, string, string][];

	let selectedEmojis: string[] = [];
	$: emojis;

	$: emojis = selectedEmojis.map((code) => ['emoji', code, $customEmojis.get(code) || '']);

	onMount(() => {
		getCustomEmojis();
	});
</script>

<div class="h-16 overflow-y-auto">
	{#each [...$customEmojis.entries()] as [code, url] (code)}
		<label class="label cursor-pointer">
			<span class="label-text flex gap-2">
				<img src={url} alt={code} class="h-4 w-4" />
				{code}
			</span>
			<input
				type="checkbox"
				class="checkbox checkbox-primary ml-2"
				bind:group={selectedEmojis}
				value={code}
			/>
		</label>
		<div class="divider" />
	{/each}
</div>
