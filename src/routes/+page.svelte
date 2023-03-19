<script lang="ts">
	import Heading from '$lib/components/elements/Heading.svelte';
	import Section from '$lib/components/elements/Section.svelte';
	import PostNote from '$lib/components/PostNote.svelte';
	import TimeLine from '$lib/components/TimeLine.svelte';
	import { pubkey } from '$lib/store/setting';
	import { subscribeEvents, type Subscribe } from '$lib/utils/nostr';
	import { onMount } from 'svelte';
	import { z } from 'zod';

	let contacts = new Set<string>();

	const contactsScheme = z.tuple([z.string(), z.string()]);

	onMount(() => {
		const contactsSub = subscribeEvents(3, { authors: [$pubkey] }, 'eose');
		contactsSub.on('event', (event) => {
			event.tags.forEach((tag) => {
				const [, pubkey] = contactsScheme.parse(tag);
				if (pubkey) {
					contacts = contacts.add(pubkey);
					contactsSub.unsub();
				}
			});
		});
	});
</script>

<Heading>ホーム</Heading>

<Section>
	<PostNote />
	<div class="mt-8">
		{#key contacts}
			<TimeLine authors={[...contacts]} />
		{/key}
	</div>
</Section>
