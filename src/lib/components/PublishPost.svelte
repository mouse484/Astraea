<script lang="ts">
	import { browser } from '$app/environment';
	import { publish } from '$lib/utils/nostr';
	import { getEventHash, type UnsignedEvent } from 'nostr-tools';

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

	const publishPost = async () => {
		if (!window.nostr) return;
		const unsignedEvent: UnsignedEvent = {
			kind: 1,
			created_at: Math.floor(Date.now() / 1000),
			tags: [],
			content,
			pubkey: await window.nostr.getPublicKey()
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
		} else {
			console.error(`Post: fail-${result.reason}`);
		}
	};
</script>

<div>
	<div class="relative">
		<textarea
			class="p-2 pr-24 w-full h-32 rounded border resize-none"
			bind:value={content}
		/>
		{#key isPublish}
			<button
				class="absolute right-0 bottom-0 p-2 m-4 bg-blue-400 rounded border disabled:bg-slate-300"
				on:click={publishPost}
				disabled={isPublish}>送信する</button
			>
		{/key}
	</div>
	{#key isNip07}
		{#if isNip07 === false}
			<p>※:投稿するにはnip-07に対応した拡張機能が必要です</p>
		{/if}
	{/key}
</div>
