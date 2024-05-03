<script lang="ts">
	import TimeLine from '$lib/components/TimeLine.svelte';
	import { useNDK } from '$lib/stores/nostr.svelte';
	import { user } from '$lib/stores/user.svelte';

	let follows = $state<string[]>();

	$effect(() => {
		const ndk = useNDK();
		(async () => {
			if (user.pubkey) {
				const result = await ndk.getUser({ pubkey: user.pubkey }).follows();
				if (result) {
					follows = [...result].map((u) => u.pubkey);
				}
			}
		})();
	});
</script>

<div class="h-screen">
	<TimeLine ids={follows} />
</div>
