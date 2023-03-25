<script lang="ts">
	import Heading from '$lib/components/elements/Heading.svelte';
	import Section from '$lib/components/elements/Section.svelte';
	import PostNote from '$lib/components/PostNote.svelte';
	import TimeLine from '$lib/components/TimeLine.svelte';
	import Trend from '$lib/components/Trend.svelte';
	import { pubkey } from '$lib/store/setting';
	import { subscribeEvents, type Subscribe } from '$lib/utils/nostr';
	import { Data } from 'emoji-mart';
	import { onMount } from 'svelte';
	import { _ } from 'svelte-i18n';
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

<Heading>{$_('home.home')}</Heading>

<Section>
	<PostNote />
	<div class="mt-8 md:flex md:gap-4">
		<div class="md:flex-grow">
			{#key contacts}
				<TimeLine
					authors={[...contacts]}
					filter={{
						since:
							new Date(
								new Date().setHours(new Date().getHours() - 1)
							).getTime() / 1000
					}}
				/>
			{/key}
		</div>

		<Trend />
	</div>
</Section>
