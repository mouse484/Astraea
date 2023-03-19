<script lang="ts">
	import Heading from '$lib/components/elements/Heading.svelte';
	import Section from '$lib/components/elements/Section.svelte';
	import TimeLine from '$lib/components/TimeLine.svelte';
	import { pubkey } from '$lib/store/setting';
	import { subscribeEvents } from '$lib/utils/nostr';
	import { onMount } from 'svelte';
	import { z } from 'zod';

	let contacts = new Set<string>();

	const contactsScheme = z.tuple([z.string(), z.string()]);

	onMount(() => {
		const sub = subscribeEvents(3, { authors: [$pubkey] });
		sub.on('event', (event) => {
			event.tags.forEach((tag) => {
				const [, pubkey] = contactsScheme.parse(tag);
				if (pubkey) contacts = contacts.add(pubkey);
			});
		});
	});
</script>

<Heading>ホーム</Heading>

<Section>
	{#key contacts}
		<TimeLine authors={[...contacts]} />
	{/key}
</Section>
