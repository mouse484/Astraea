<script lang="ts">
	import Icon from '@iconify/svelte';
	import { _ } from 'svelte-i18n';
	import Button from '../../elements/form/Button.svelte';
	import { isNip07 } from '$lib/nostr/isNip07';
	import { publishEvent } from '$lib/nostr/pool';
	import type { UnsignedEvent } from 'nostr-tools';
	import { pubkey } from '$lib/store/pubkey';
	import { useRelays } from '$lib/nostr/relays';
	import { createEventDispatcher, onMount } from 'svelte';
	import CustomEmojiForm from './CustomEmojiForm.svelte';

	const dispatch = createEventDispatcher<{ status: 'success' }>();

	export let replyFor: string | undefined = undefined;

	let textarea: HTMLTextAreaElement;

	let content = '';
	let isNip36 = false;
	let nip36Content = '';
	let emojis: [string, string, string][] = [];

	$: isPublish = !(isNip07() && !!content);

	const writeRelays = useRelays('write');

	const publishPost = async () => {
		const tags: string[][] = [];

		if (replyFor) {
			tags.push(['e', replyFor, '', 'reply']);
		}
		if (emojis) {
			tags.push(...emojis);
		}
		if (isNip36) {
			tags.push(['content-warning', nip36Content]);
		}

		const unsignedEvent: UnsignedEvent = {
			kind: 1,
			created_at: Math.floor(Date.now() / 1000),
			tags,
			content,
			pubkey: $pubkey
		};

		const pub = await publishEvent(unsignedEvent, writeRelays);

		pub?.on('ok', () => {
			content = '';
			isNip36 = false;
			nip36Content = '';

			dispatch('status', 'success');
		});
	};

	onMount(() => {
		content = '';
	});
</script>

<div>
	<div class="relative">
		<textarea
			class="p-2 pr-24 w-full h-32 rounded border resize-none"
			bind:value={content}
			bind:this={textarea}
			on:keydown={(event) => content && event.ctrlKey && event.key === 'Enter' && publishPost()}
		/>
		<button
			class="absolute top-0 right-0 m-4"
			on:click={() => {
				textarea.focus();
				content = '';
			}}
		>
			<Icon icon="mdi:close-thick" />
		</button>
	</div>

	<div class="flex gap-2 justify-between mt-2">
		<div class="flex gap-2">
			<label class="block p-2 rounded border">
				{$_('home.nip36.nip36')}
				<input type="checkbox" bind:checked={isNip36} />
			</label>
			{#if isNip36}
				<input
					class="p-2 rounded border"
					list="nip36-reason"
					type="text"
					placeholder={$_('home.nip36.reason')}
					bind:value={nip36Content}
					disabled={!isNip36}
				/>

				<datalist id="nip36-reason">
					<option value={$_('home.nip36.nude')} />
					<option value={$_('home.nip36.violence')} />
					<option value={$_('home.nip36.sensitive')} />
				</datalist>
			{/if}
		</div>
		<CustomEmojiForm bind:emojis />
		<Button on:click={publishPost} disabled={isPublish}>
			{$_('home.post.post')}
		</Button>
	</div>
</div>
