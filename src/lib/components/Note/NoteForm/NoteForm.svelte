<script lang="ts">
	import { nostr } from '$lib/stores/nostr.svelte';
	import { NDKEvent, NDKKind } from '@nostr-dev-kit/ndk';
	import i18next from 'i18next';
	import NoteContent from '../NoteContent/NoteContent.svelte';

	const { replyTo, onPublished }: { replyTo?: string; onPublished?: () => void } = $props();

	let input = $state('');

	const post = async () => {
		const { ndk } = nostr;
		const event = new NDKEvent(ndk);
		event.kind = NDKKind.Text;
		event.content = input;

		if (replyTo) {
			event.tags.push(['e', replyTo, '', 'reply']);
		}

		await event.publish();
		onPublished?.();
		input = '';
	};
</script>

<div class="h-full w-full flex flex-col gap-4">
	<NoteContent content={input} editorClassList="border-(1 accent) p-2 rounded-md" />

	<button
		type="submit"
		disabled={!input}
		onclick={post}
		class="ml-auto flex-1 rounded-2xl bg-transparent text-lg"
		border="1 accent"
		p="x-2 y-1"
		hover="bg-accent text-revert"
	>
		{i18next.t('home.post.post')}
	</button>
</div>
