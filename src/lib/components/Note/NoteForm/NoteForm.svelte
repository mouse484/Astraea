<script lang="ts">
	import Icon from '@iconify/svelte';
	import { _ } from 'svelte-i18n';
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
			class="w-full h-32 text-base resize-none textarea textarea-secondary textarea-bordered"
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

	<div class="flex flex-wrap gap-2 justify-between mt-2">
		<div class="form-control">
			<label class="label input-group">
				<span class="w-max label-text">{$_('home.nip36.nip36')}</span>
				<input type="checkbox" class="checkbox checkbox-accent btn" bind:checked={isNip36} />
				<input
					class="input input-bordered"
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
			</label>
		</div>
		<CustomEmojiForm bind:emojis />
		<button on:click={publishPost} class="btn btn-primary" disabled={isPublish}>
			{$_('home.post.post')}
		</button>
	</div>
</div>
