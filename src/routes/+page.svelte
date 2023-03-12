<script lang="ts">
	import PublishPost from '$lib/components/PublishPost.svelte';
	import TimeLine from '$lib/components/TimeLine.svelte';
	import Trend from '$lib/components/Trend.svelte';
	import { contacts } from '$lib/data/contacts';
	import { pubkey } from '$lib/data/setting';
	import { get } from '$lib/utils/nostr';

	const getContracts = async () => {
		if ($contacts.size) return [...$contacts];
		const contactsEvent = await get({ kinds: [3], authors: [$pubkey] });
		if (!contactsEvent) return;
		const tags = contactsEvent.tags as [string, string][];
		contacts.set(
			new Set(
				tags.map(([, id]) => {
					return id;
				})
			)
		);
		return [...$contacts];
	};
</script>

<section>
	<div>
		<PublishPost />
	</div>

	<div class="mt-8 md:justify-between md:flex md:gap-8">
		<div>
			{#await getContracts()}
				<p>Loading...</p>
			{:then contacts}
				{#if contacts}
					<TimeLine authors={contacts} filter={{ limit: 20 }} />
				{/if}
			{/await}
		</div>

		<div class="hidden md:block">
			<Trend />
		</div>
	</div>
</section>
