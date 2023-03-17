<script lang="ts">
	import AwaitNote from '$lib/components/Note/AwaitNote.svelte';
	import Profile from '$lib/components/Profile/Profile.svelte';
	import { notes } from '$lib/data/notes';
	import { pubkey } from '$lib/data/setting';
	import Icon from '@iconify/svelte';
	import Loading from '../elements/Loading.svelte';

	$: items = [...$notes.entries()].filter(([, { root }]) => {
		if (root?.event.pubkey !== $pubkey) return;
		if (root.reactions?.size) return true;
	});
</script>

<h2 class="text-2xl">通知</h2>
<div class="flex flex-col mt-8">
	{#each items as [id, item]}
		<div class="p-4 mt-4 border">
			{#if item}
				<div class="flex flex-wrap gap-4">
					{#each [...(item.root?.reactions?.values() || [])] as { pubkey, content }}
						<div class="flex gap-2 items-center">
							<Profile npubHex={pubkey} imageOnly={true} />
							<div class="text-3xl">
								{#if content === '+'}
									<Icon icon="mdi:cards-heart" color={'red'} />
								{:else}
									{content}
								{/if}
							</div>
						</div>
					{/each}
				</div>
			{/if}
			<AwaitNote {id} />
		</div>
	{:else}
		<Loading>Notifications</Loading>
	{/each}
</div>
