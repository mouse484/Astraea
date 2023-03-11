<script lang="ts">
	import { browser } from '$app/environment';
	import { publish } from '$lib/utils/nostr';
	import { getEventHash, type UnsignedEvent } from 'nostr-tools';

	let content: string;
	let isNip07 = false;
	let status: string;

	if (browser) {
		if (window.nostr) {
			isNip07 = true;
		}
	}

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
			status = 'ok';
		} else {
			status = `fail:${result.reason}`;
		}
	};
</script>

{#if isNip07}
	<input type="text" placeholder="なにしてる？" bind:value={content} />
	<button on:click={publishPost} disabled={!content}>送信</button>
	{#if status}
		<p>{status}</p>
	{/if}
{:else}
	nip-07に対応した拡張機能が必要です
{/if}
