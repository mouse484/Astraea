<script lang="ts">
	import { nostr } from '$lib/stores/nostr.svelte';
	import { NDKEvent, NDKKind } from '@nostr-dev-kit/ndk';
	import i18next from 'i18next';

	let input = $state('');

	const post = async () => {
		const { ndk } = nostr;
		const event = new NDKEvent(ndk);
		event.kind = NDKKind.Text;
		event.content = input;
		await event.publish();
		input = '';
	};
</script>

<div class="h-full w-full flex flex-col gap-4">
	<textarea
		bind:value={input}
		class="mt-2 h-full w-full resize-none rounded-md bg-transparent p-2 outline-none"
		border="1 accent"
	>
	</textarea>
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
