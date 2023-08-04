<script lang="ts">
	import Icon from '$lib/components/elements/Icon.svelte';
	import { isNip07 } from '$lib/nostr/isNip07';
	import { publishEvent } from '$lib/nostr/pool';
	import { useRelays } from '$lib/nostr/relays';
	import { pubkey } from '$lib/store/pubkey';
	import type { UnsignedEvent } from 'nostr-tools';
	import { createEventDispatcher, onMount } from 'svelte';
	import { _ } from 'svelte-i18n';
	import { writable } from 'svelte/store';
	import EmojiForm from './EmojiForm.svelte';

	const dispatch = createEventDispatcher<{ status: 'success' }>();

	export let replyFor: string | undefined = undefined;

	let textarea: HTMLTextAreaElement;

	let content = '';
	let isNip36 = false;
	let nip36Content = '';

	let nip36edit: { showModal(): void }; // daisyUI

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

		await publishEvent(unsignedEvent, writeRelays);

		content = '';
		isNip36 = false;
		nip36Content = '';
		customEmojis.update((v) => {
			v.clear();
			return v;
		});

		dispatch('status', 'success');
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
			<Icon name="close-thick" />
		</button>
	</div>

	<div class="mt-2 flex flex-wrap gap-2 justify-between items-end">
		<div class="form-control">
			<label class="label cursor-pointer flex gap-2">
				<span class="label-text">{$_('home.nip36.nip36')}</span>
				<input id="nip36" type="checkbox" class="checkbox checkbox-accent" bind:checked={isNip36} />
				<button
					class="text-accent disabled:text-neutral tooltip"
					disabled={!isNip36}
					data-tip={$_('home.nip36.edit')}
					on:click={() => nip36edit.showModal()}
				>
					<Icon name="edit" size="1" />
				</button>
			</label>
			<dialog bind:this={nip36edit} class="modal">
				<form method="dialog" class="modal-box">
					<input
						class="input input-bordered join-item w-full"
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
					<div class="modal-action">
						<button class="btn">Close</button>
					</div>
				</form>
			</dialog>
		</div>
		<EmojiForm
			on:selectEmoji={({ detail }) => {
				if (!detail.native) {
					customEmojis.update((v) => v.set(detail.id, detail.src || ''));
				}
				const emoji = detail.native || detail.shortcodes;
				if (!content) return (content = emoji);

				if (textarea.selectionStart) {
					content = `${content.substring(0, textarea.selectionStart)} ${emoji} ${content.substring(
						textarea.selectionEnd,
						content.length
					)}`;
				} else {
					content = `${content} ${emoji}`;
				}
			}}
		/>
		<button on:click={publishPost} class="btn btn-primary" disabled={isPublish}>
			{$_('home.post.post')}
		</button>
	</div>
</div>
