<script lang="ts">
	import type { NDKEvent, NDKUserProfile } from '@nostr-dev-kit/ndk';

	const { event }: { event: NDKEvent } = $props();

	let profile = $state<NDKUserProfile>();

	const shortPubkey = event.author.pubkey.substring(0, 10);

	$effect(() => {
		(async () => {
			const result = await event.author.fetchProfile();
			if (result) {
				profile = result;
			}
		})();
	});
</script>

<div class="flex gap-4 border-y-(1 gray-600 solid) p-4">
	<a href="/profile/{event.author.pubkey}">
		<img class="size-16 rounded-md" src={profile?.image} alt={profile?.name} />
	</a>
	<div class="flex-1">
		<div>
			<p>
				{profile?.displayName || profile?.name || shortPubkey}
			</p>
			<p class="text-sm">{profile?.nip05}</p>
		</div>
		<div class="mt-4 max-h-8ch overflow-hidden break-all hover:max-h-full">{event.content}</div>
	</div>
</div>
