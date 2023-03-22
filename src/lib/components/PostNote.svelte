<script lang="ts">
	import { browser } from '$app/environment';
	import { pubkey } from '$lib/store/setting';
	import { publishEvent } from '$lib/utils/nostr';
	import Icon from '@iconify/svelte';
	import type { UnsignedEvent } from 'nostr-tools';
	import Button from './elements/Button.svelte';

	export let replyFor = '';
	export let small = false;

	let content: string;
	let isNip07: boolean;
	let isNip36 = false;
	let nip36Content = '';

	if (browser) {
		if (window.nostr) {
			isNip07 = true;
		} else {
			isNip07 = false;
		}
	}

	$: isPublish = !(isNip07 && !!content);

	const keydown = (event: KeyboardEvent) => {
		if (event.ctrlKey && event.key === 'Enter') {
			publishPost();
		}
	};

	const publishPost = async () => {
		const tags: string[][] = [];
		if (replyFor) {
			tags.push(['e', replyFor, '', 'reply']);
		}
		if (nip36Content) {
			tags.push(['content-warning', nip36Content]);
		}

		const unsignedEvent: UnsignedEvent = {
			kind: 1,
			created_at: Math.floor(Date.now() / 1000),
			tags,
			content,
			pubkey: $pubkey
		};

		const pub = await publishEvent(unsignedEvent);

		pub?.on('ok', () => {
			content = '';
			isNip36 = false;
			nip36Content = '';
		});
	};
</script>

<div>
	<div class="relative">
		<textarea
			class="p-2 pr-24 w-full h-32 rounded border resize-none"
			bind:value={content}
			on:keydown={keydown}
		/>
		<button class="absolute top-0 right-0 m-4" on:click={() => (content = '')}>
			<Icon icon="mdi:close-thick" />
		</button>
		<div class="flex gap-2 justify-between mt-2">
			<div class="flex gap-2">
				<label class="block p-2 rounded border">
					投稿に警告を含める
					<input type="checkbox" bind:checked={isNip36} />
				</label>
				{#if isNip36}
					<input
						class="p-2 rounded border"
						list="nip36-reason"
						type="text"
						placeholder="理由"
						bind:value={nip36Content}
						disabled={!isNip36}
					/>

					<datalist id="nip36-reason">
						<option value="ヌード" />
						<option value="暴力" />
						<option value="センシティブ" />
					</datalist>
				{/if}
			</div>
			<Button on:click={publishPost} disabled={isPublish}>送信する</Button>
		</div>
	</div>
	{#key isNip07}
		{#if isNip07 === false}
			<p>※:投稿するにはnip-07に対応した拡張機能が必要です</p>
		{/if}
	{/key}
</div>
