<script lang="ts">
	import Icon from '@iconify/svelte';
	import { _ } from 'svelte-i18n';
	import { isNip07 } from '$lib/nostr/isNip07';
	import { publishEvent } from '$lib/nostr/pool';
	import type { UnsignedEvent } from 'nostr-tools';
	import { pubkey } from '$lib/store/pubkey';
	import { useRelays } from '$lib/nostr/relays';
	import { createEventDispatcher, onMount } from 'svelte';
	import EmojiForm from './EmojiForm.svelte';
	import { writable } from 'svelte/store';

	const dispatch = createEventDispatcher<{ status: 'success' }>();

	export let replyFor: string | undefined = undefined;

	let textarea: HTMLTextAreaElement;

	let content = '';
	let isNip36 = false;
	let nip36Content = '';
	const customEmojis = writable(new Map<string, string>());

	$: isPublish = !(isNip07() && !!content);

	const writeRelays = useRelays('write');

	const publishPost = async () => {
		const tags: string[][] = [];

		if (replyFor) {
			tags.push(['e', replyFor, '', 'reply']);
		}
		if ($customEmojis.size) {
			[...$customEmojis.entries()].forEach(([code, url]) => {
				tags.push(['emoji', code, url]);
			});
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
			customEmojis.update((v) => {
				v.clear();
				return v;
			});

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

	<div class="flex flex-wrap gap-2 justify-between items-center mt-2">
		<div>
			<div class="p-2 border join border-accent">
				<label for="nip36" class="cursor-pointer label join-item">
					<span class="label-text">{$_('home.nip36.nip36')}</span>
				</label>
				<input
					id="nip36"
					type="checkbox"
					class="mx-2 btn checkbox checkbox-accent"
					bind:checked={isNip36}
				/>
				<input
					class="input input-bordered join-item"
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
			</div>
		</div>
		<EmojiForm
			on:selectEmoji={({ detail }) => {
				if (!detail.native) {
					customEmojis.update((v) => v.set(detail.id, detail.src || ''));
				}
				const emoji = detail.native || detail.shortcodes;
				content = content ? `${content} ${emoji}` : emoji;
			}}
		/>
		<button on:click={publishPost} class="btn btn-primary" disabled={isPublish}>
			{$_('home.post.post')}
		</button>
	</div>
</div>
