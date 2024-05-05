<script lang="ts">
	import type { NDKEvent, NDKTag, NDKUserProfile } from '@nostr-dev-kit/ndk';
	import NoteFooter from './NoteFooter.svelte';
	import NoteContent from './NoteContent/NoteContent.svelte';

	const { note, isReply = false }: { note: NDKEvent; isReply: boolean } = $props();

	let profile = $state<NDKUserProfile>();

	const shortPubkey = note.author.pubkey.substring(0, 10);

	$effect(() => {
		(async () => {
			const result = await note.author.fetchProfile();
			if (result) {
				profile = result;
			}
		})();
	});

	const hasReply = $derived(
		note.tags.reverse().find(([type, , , marker]) => {
			return type === 'e' && (!marker || ['reply', 'root'].includes(marker));
		})
	);

	const getReplyToEvent = async (tag: NDKTag) => {
		const [, id] = tag;
		if (id === note.id) throw new Error('Reply to self');
		return await note.ndk?.fetchEvent(id);
	};
</script>

{#if hasReply}
	{#await getReplyToEvent(hasReply) then reply}
		<svelte:self note={reply} isReply={true} />
	{/await}
{/if}
<div
	class={[
		'flex gap-4 border-y-(1 gray-600 solid) p-4',
		hasReply ? 'border-t-none' : '',
		isReply ? 'border-b-none' : ''
	].join(' ')}
>
	<div>
		<a href="/profile/{note.author.pubkey}">
			<img class="size-16 rounded-md" src={profile?.image} alt={profile?.name} />
		</a>
		{#if isReply}
			<!-- 0.5 * 2 + 3 = 4 (size-16) -->
			<div class="mx-auto mt-0.5rem h-[calc(100%-3rem)] w-0.5 bg-gray"></div>
		{/if}
	</div>
	<div class="flex-1">
		<div>
			<p>
				{profile?.displayName || profile?.name || shortPubkey}
			</p>
			<p class="text-sm">{profile?.nip05}</p>
		</div>
		<div class="mt-4 max-h-8ch overflow-hidden break-all hover:max-h-full">
			<NoteContent content={note.content} editable={false} />
		</div>
		<NoteFooter {note} />
	</div>
</div>
