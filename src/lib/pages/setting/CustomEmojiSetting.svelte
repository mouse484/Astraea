<script lang="ts">
	import { customEmojis as emojis, getCustomEmojis } from '$lib/store/customEmoji';
	import { setLocalStorage } from '$lib/utils/localStorage';
	import { onMount } from 'svelte';
	import { z } from 'zod';

	onMount(() => {
		getCustomEmojis();
	});

	let code: string;
	let url: string;

	const add = (c: string, u: string, clear = true) => {
		emojis.update((v) => v.set(c, u));

		if (clear) {
			code = '';
			url = '';
		}

		setLocalStorage('emojis', JSON.stringify([...$emojis.entries()]));
	};

	const emojiListScheme = z.record(z.string());

	const importEmoji = async () => {
		const response = await fetch(`/api/json?url=${url}`);
		if (!response) return;
		const emojiJson = await response.json();
		const parsed = emojiListScheme.safeParse(emojiJson);
		if (parsed.success) {
			Object.entries(parsed.data).forEach(([code, url]) => {
				add(code, url, false);
			});
			url = '';
		}
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
		<label for="code" class="label">
			<span class="label-text">shortcode</span>
		</label>
		<input
			type="text"
			id="code"
			placeholder="絵文字の名前（インポートする場合は空）"
			class="w-80 input input-bordered"
			bind:value={code}
		/>
		<label for="url" class="label">
			<span class="label-text">url</span>
		</label>
		<input
			type="text"
			id="url"
			placeholder="絵文字URL/インポートするJSONのURL"
			class="w-80 input input-bordered"
			bind:value={url}
		/>
	</div>

	<button on:click={() => add(code, url)} class="mt-4 btn btn-secondary" disabled={!code || !url}>
		追加
	</button>
	<button on:click={() => importEmoji()} class="mt-4 btn btn-secondary" disabled={!url || !!code}>
		インポート
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
