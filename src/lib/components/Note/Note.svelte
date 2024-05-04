<script lang="ts">
	import type { NDKEvent, NDKUserProfile } from '@nostr-dev-kit/ndk';
	import Reactions from './Reactions.svelte';

	const { note }: { note: NDKEvent } = $props();

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
</script>

<div class="flex gap-4 border-y-(1 gray-600 solid) p-4">
	<a href="/profile/{note.author.pubkey}">
		<img class="size-16 rounded-md" src={profile?.image} alt={profile?.name} />
	</a>
	<div class="flex-1">
		<div>
			<p>
				{profile?.displayName || profile?.name || shortPubkey}
			</p>
			<p class="text-sm">{profile?.nip05}</p>
		</div>
		<div class="mt-4 max-h-8ch overflow-hidden break-all hover:max-h-full">{note.content}</div>
		<Reactions {note} />
	</div>
</div>
