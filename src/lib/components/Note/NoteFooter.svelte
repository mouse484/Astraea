<script lang="ts">
	import type { NDKEvent } from '@nostr-dev-kit/ndk';
	import Reactions from './Reactions.svelte';
	import Icon from '../elements/Icon.svelte';
	import NoteForm from './NoteForm/NoteForm.svelte';

	const { note }: { note: NDKEvent } = $props();

	let isOpenReplyForm = $state(false);
</script>

<div class="mt-4 flex items-center gap-2">
	<button class="bg-transparent" onclick={() => (isOpenReplyForm = !isOpenReplyForm)}>
		<Icon name="message-outline" size="1" />
	</button>
	<Reactions {note} />
</div>
{#if isOpenReplyForm}
	<div class="mt-8 h-40">
		<NoteForm replyTo={note.id} onPublished={() => (isOpenReplyForm = false)} />
	</div>
{/if}
