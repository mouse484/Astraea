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

<div class="p-2 m-2 border-solid border-blueGray rounded-md grid grid-cols-5">
	<img class="rounded-md size-16" src={profile?.image} alt={profile?.name} />
	<div class="col-span-4">
		<div>
			<div>
				{profile?.name || profile?.displayName || shortPubkey}
				<span class="text-sm">{profile?.nip05}</span>
			</div>
			<div class="text-sm text-gray">{shortPubkey}</div>
		</div>
		<div class="mt-4 break-all overflow-hidden hover:max-h-full max-h-8ch">{event.content}</div>
	</div>
</div>
