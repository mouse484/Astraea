<script lang="ts">
	import Heading from '$lib/components/elements/Heading.svelte';
	import Section from '$lib/components/elements/Section.svelte';
	import Profile from '$lib/components/Profile/Profile.svelte';
	import Emoji from '$lib/components/elements/Emoji.svelte';

	import Note from '$lib/components/Note/Note.svelte';
	import { pubkey } from '$lib/store/pubkey';
	import { reactions } from '$lib/store/reactions';
	import { onDestroy } from 'svelte';
	import { _ } from 'svelte-i18n';
	import { writable } from 'svelte/store';

	const items = writable(new Map<string, [{ [key: string]: string[] }, number]>());

	const unsubscribe = reactions.subscribe((events) => {
		[...events.values()].forEach(({ events: reactEvents, lastUpdate }) => {
			reactEvents.forEach((e) => {
				const [, reactPubkey] = e.tags.find(([type]) => type === 'p') || [];
				const [, reactEventId] = e.tags.find(([type]) => type === 'e') || [];
				if (reactPubkey === $pubkey) {
					const [current, update = 0] = $items.get(reactEventId) || [];
					const newReaction = current || {};

					newReaction[e.content] = current?.[e.content]
						? [...new Set(current[e.content]).add(e.pubkey)]
						: [e.pubkey];
					items.update((r) =>
						r.set(reactEventId, [newReaction, update > lastUpdate ? update : lastUpdate])
					);
				}
			});
		});
	});

	onDestroy(() => {
		unsubscribe();
	});
</script>

<Heading>{$_('notifications.notifications')}</Heading>

<Section>
	<div class="flex flex-col gap-4">
		{#each [...$items.entries()].sort(([, [, a]], [, [, b]]) => b - a) as [id, [reactionList]] (id)}
			<div>
				{#each Object.entries(reactionList) as [emoji, users] (emoji)}
					<div class="flex flex-wrap gap-2">
						<Emoji emoji={emoji.replace('+', '❤')} />
						{#each users as pubkey}
							<Profile {pubkey} imageOnly={true} />
						{/each}
					</div>
				{/each}
				<div class="mt-2">
					<Note {id} />
				</div>
			</div>
		{/each}
	</div>
</Section>