<script lang="ts">
	import { useRelays } from '$lib/nostr/relays';
	import { noteQuery } from '$lib/query/note';
	import Icon from '@iconify/svelte';
	import Profile from '../Profile/Profile.svelte';
	import NoteContent from './NoteContent.svelte';
	import NoteFooter from './NoteFooter.svelte';
	import { _ } from 'svelte-i18n';
	import { createEventDispatcher, onMount, onDestroy } from 'svelte';

	export let id: string;
	export let isReply = false;
	export let repost: string | undefined = undefined;

	const dispatch = createEventDispatcher<{ status: 'in' | 'out' }>();

	$: note = noteQuery(id, useRelays('read'));

	$: event = $note.data;

	$: hasReply = event?.tags.reverse().find(([type, , , marker]) => {
		return type === 'e' && (!marker || marker === 'reply');
	});

	let isNip36Visable = false;
	// [type=content-warning,reason=string]
	$: hasNip36Warn = event?.tags.find(([type]) => type === 'content-warning') as
		| [string, string | undefined]
		| undefined;

	onMount(() => {
		dispatch('status', 'in');
	});
	onDestroy(() => {
		dispatch('status', 'out');
	});
</script>

{#if event}
	<div>
		{#if !repost && !isReply && hasReply}
			<svelte:self id={hasReply[1]} isReply={true} />
		{/if}
		{#if repost && !!repost.length}
			<div class="flex items-center mb-2">
				<div class="text-3xl">
					<Icon icon="mdi:repeat" />
				</div>
				<Profile pubkey={repost} imageOnly={true} />
			</div>
		{/if}
		<div
			class="border rounded p-2 flex-col flex gap-2 {isReply ? 'border-b-0 border-primary' : ''}"
		>
			<div class="flex justify-between">
				<Profile pubkey={event.pubkey} />
				<div class="text-sm">{new Date(event.created_at * 1000).toLocaleString()}</div>
			</div>
			{#if hasNip36Warn && !isNip36Visable}
				{@const [, nip36Reason] = hasNip36Warn}
				<button class="p-2 m-2 rounded border" on:click={() => (isNip36Visable = true)}>
					<p>{$_('home.nip36.why')}</p>
					{#if nip36Reason}
						<p>{$_('home.nip36.reason')}: <span class="font-bold">{nip36Reason}</span></p>
					{/if}
				</button>
			{:else}
				<NoteContent {event} />
			{/if}
			<NoteFooter {event} />
		</div>
	</div>
{/if}
