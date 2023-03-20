<script lang="ts">
	import { browser } from '$app/environment';
	import { pubkey } from '$lib/store/setting';
	import { publishEvent } from '$lib/utils/nostr';
	import Icon from '@iconify/svelte';
	import type { UnsignedEvent } from 'nostr-tools';
	import Button from './elements/Button.svelte';

	export let replyFor = '';

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
		{#key isPublish}
			<div class="absolute right-0 bottom-0 m-4 flex gap-2">
				<label class="flex flex-col justify-center">
					nip-36
					<div>
						<input type="checkbox" bind:checked={isNip36} />
						<input
							class="border rounded px-2"
							type="text"
							placeholder="reason"
							bind:value={nip36Content}
							disabled={!isNip36}
						/>
					</div>
				</label>
				<Button on:click={publishPost} disabled={isPublish}>送信する</Button>
			</div>
		{/key}
	</div>
	{#key isNip07}
		{#if isNip07 === false}
			<p>※:投稿するにはnip-07に対応した拡張機能が必要です</p>
		{/if}
	{/key}
</div>
