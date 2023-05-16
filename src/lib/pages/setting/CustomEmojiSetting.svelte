<script lang="ts">
	import Button from '$lib/components/elements/form/Button.svelte';
	import { setLocalStorage } from '$lib/utils/localStorage';
	import { onMount } from 'svelte';
	import { customEmojis as emojis, getCustomEmojis } from '$lib/store/customEmoji';

	onMount(() => {
		getCustomEmojis();
	});

	$: console.log($emojis);

	let code: string;
	let url: string;

	const add = () => {
		if (!code || !url) return;
		emojis.update((v) => v.set(code, url));

		code = '';
		url = '';
		setLocalStorage('emojis', JSON.stringify([...$emojis.entries()]));
	};
</script>

<div class="w-64">
	<div class="flex flex-col mt-4">
		<label class="flex justify-between">
			<span class="text-xs">name:</span>
			<input type="text" bind:value={code} />
		</label>
		<label class="flex justify-between">
			<span class="text-xs">url:</span>
			<input type="text" bind:value={url} />
		</label>
	</div>
	<Button on:click={() => add()} disabled={!code || !url}>追加</Button>

	<h4>絵文字一覧</h4>
	<div>
		<table class="table">
			<thead>
				<tr>
					<th>プレビュー</th>
					<th>name</th>
					<th>url</th>
					<th>削除</th>
				</tr>
			</thead>
			<tbody>
				{#each [...$emojis.entries()] as [code, url] (code)}
					<tr>
						<td>
							<img src={url} alt={code} class="w-8 h-8" />
						</td>
						<td>{code}</td>
						<td>
							<span class="tooltip" data-tip={url}>
								{url.substring(0, 30)}
							</span>
						</td>
						<td>
							<Button
								on:click={() => {
									emojis.update((v) => {
										v.delete(code);
										return v;
									});
								}}
							>
								X
							</Button>
						</td>
					</tr>
				{/each}
			</tbody>
		</table>
	</div>
</div>
