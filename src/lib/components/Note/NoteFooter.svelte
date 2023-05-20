<script lang="ts">
	import Icon from '@iconify/svelte';
	import Reactions from './Reactions.svelte';
	import NoteForm from './NoteForm/NoteForm.svelte';
	import type { Event } from 'nostr-tools';

	export let event: Event;

	let isReplyOpen = false;
</script>

<div class="flex gap-2">
	<div class="flex relative">
		<button
			on:click={() => {
				isReplyOpen = !isReplyOpen;
			}}
		>
			<Icon icon="mdi:message-outline" />
		</button>
		{#if isReplyOpen}
			<div class="absolute top-8 z-30 p-2 w-max bg-base-100 border border-dashed">
				<NoteForm
					replyFor={event.id}
					on:status={(ev) => {
						if (ev.detail === 'success') {
							isReplyOpen = false;
						}
					}}
				/>
			</div>
		{/if}
	</div>
	<Reactions {event} />
</div>
