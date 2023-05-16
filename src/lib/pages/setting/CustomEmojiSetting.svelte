<script lang="ts">
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
	const deleteEmoji = (code: string) => {
		emojis.update((v) => {
			v.delete(code);
			return v;
		});
		setLocalStorage('emojis', JSON.stringify([...$emojis.entries()]));
	};
</script>

<div>
	<div>
		<label class="input-group">
			<span class="w-20">name</span>
			<input type="text" class="input input-bordered" bind:value={code} />
		</label>
		<label class="mt-2 input-group">
			<span class="w-20">url</span>
			<input type="text" class="input input-bordered" bind:value={url} />
		</label>
	</div>

	<button on:click={() => add()} class="mt-4 btn btn-secondary" disabled={!code || !url}>
		追加
	</button>

	<h4 class="mt-4 text-lg">絵文字一覧</h4>
	<div class="overflow-y-scroll mt-2 h-60">
		<table class="table table-zebra">
			<thead>
				<tr>
					<th />
					<th>プレビュー</th>
					<th>name</th>
					<th>url</th>
					<th>削除</th>
				</tr>
			</thead>
			<tbody>
				{#each [...$emojis.entries()] as [code, url], index (code)}
					<tr>
						<th>{index}</th>
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
							<button on:click={() => deleteEmoji(code)} class="btn">X</button>
						</td>
					</tr>
				{/each}
			</tbody>
		</table>
	</div>
</div>
