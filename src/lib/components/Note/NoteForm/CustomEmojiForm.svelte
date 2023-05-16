<script lang="ts">
	import Button from '$lib/components/elements/form/Button.svelte';

	export let emojis: { code: string; url: string }[];

	let code: string;
	let url: string;

	const add = () => {
		if (!code || !url) return;
		emojis = [...emojis, { code, url }];
		code = '';
		url = '';
	};
	$: emojiList = emojis.map(({ code }) => `:${code}:`);
</script>

<div>
	<p>Emoji <span class="text-sx">{emojiList}</span></p>
	<div class="flex flex-col">
		<label>
			<span class="text-xs">name</span>
			<input type="text" bind:value={code} />
		</label>
		<label>
			<span class="text-xs">url</span>
			<input type="text" bind:value={url} />
		</label>
	</div>
	<Button on:click={() => add()} disabled={!code || !url}>追加</Button>
</div>
