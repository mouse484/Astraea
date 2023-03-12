<script lang="ts">
	import { browser } from '$app/environment';
	import { pubkey } from '$lib/data/setting';
	import { publish } from '$lib/utils/nostr';
	import { getEventHash, type UnsignedEvent } from 'nostr-tools';
	import { createEventDispatcher } from 'svelte';
	import Button from './elements/Button.svelte';

	const dispatch = createEventDispatcher<{ status: boolean }>();

	export let replyFor = '';

	let content: string;
	let isNip07: boolean;

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
		if (!window.nostr) return;
		const unsignedEvent: UnsignedEvent = {
			kind: 1,
			created_at: Math.floor(Date.now() / 1000),
			tags: replyFor ? [['e', replyFor, '', 'reply']] : [],
			content,
			pubkey: $pubkey
		};

		// ホントは型違う
		const event = await window.nostr.signEvent({
			id: getEventHash(unsignedEvent),
			...unsignedEvent
		});

		const result = await publish(event);
		if (result.status === 'ok') {
			console.info('Post: Published');
			content = '';
			dispatch('status', true);
		} else {
			console.error(`Post: fail-${result.reason}`);
			dispatch('status', false);
		}
	};
</script>

<div>
	<div class="relative">
		<textarea
			class="p-2 pr-24 w-full h-32 rounded border resize-none"
			bind:value={content}
			on:keydown={keydown}
		/>
		{#key isPublish}
			<div class="absolute right-0 bottom-0 m-4">
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
