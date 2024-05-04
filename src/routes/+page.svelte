<script lang="ts">
	import NoteForm from '$lib/components/Note/NoteForm/NoteForm.svelte';
	import TimeLine from '$lib/components/TimeLine.svelte';
	import { nostr } from '$lib/stores/nostr.svelte';
	import { user } from '$lib/stores/user.svelte';

	let follows = $state<string[]>();

	$effect(() => {
		const { ndk } = nostr;
		(async () => {
			if (user.pubkey) {
				const result = await ndk?.getUser({ pubkey: user.pubkey }).follows();
				if (result) {
					follows = [...result].map((u) => u.pubkey);
				}
			}
		})();
	});
</script>

<div class="h-20vh py-4">
	<NoteForm />
</div>

<div class="h-80vh">
	<TimeLine ids={follows} />
</div>
