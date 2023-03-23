<script lang="ts">
	import Heading from '$lib/components/elements/Heading.svelte';
	import Section from '$lib/components/elements/Section.svelte';
	import NoteWithId from '$lib/components/Note/NoteWithId.svelte';
	import Profile from '$lib/components/Profile/Profile.svelte';
	import { reactions } from '$lib/store/reactions';
	import { pubkey } from '$lib/store/setting';
	import { twemoji } from '$lib/utils/twemoji';
	import { onDestroy } from 'svelte';
	import { _ } from 'svelte-i18n';
	import { writable } from 'svelte/store';

	const items = writable(new Map<string, { [key: string]: string[] }>());

	const unsubscribe = reactions.subscribe((events) => {
		[...events.values()].forEach((e) => {
			const [, reactPubkey] = e.tags.find(([type]) => type === 'p') || [];
			const [, reactEventId] = e.tags.find(([type]) => type === 'e') || [];
			if (reactPubkey === $pubkey) {
				const current = $items.get(reactEventId);
				const newReaction = current || {};

				newReaction[e.content] = current?.[e.content]
					? [...new Set(current[e.content]).add(e.pubkey)]
					: [e.pubkey];

				items.update((r) => r.set(reactEventId, newReaction));
			}
		});
	});

	onDestroy(() => {
		unsubscribe();
	});
</script>

<Heading>{$_("notifications.notifications")}</Heading>

<Section>
	<div class="flex flex-col gap-4">
		{#each [...$items.entries()] as [id, reactionList] (id)}
			<div>
				{#each Object.entries(reactionList) as [emoji, users] (emoji)}
					<div class="flex flex-wrap gap-2">
						<div class="[&>.emoji]:h-8" use:twemoji>
							{emoji.replace('+', '❤')}
						</div>
						{#each users as pubkey}
							<Profile {pubkey} imageOnly={true} />
						{/each}
					</div>
				{/each}
				<div class="mt-2">
					<NoteWithId {id} />
				</div>
			</div>
		{/each}
	</div>
</Section>
