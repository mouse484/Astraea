<script lang="ts">
	import TimeLine from '$lib/components/TimeLine.svelte';
	import { pubkey } from '$lib/data/setting';
	import { get } from '$lib/utils/nostr';
	import { onMount } from 'svelte';
	import { writable } from 'svelte/store';

	const getContracts = async () => {
		const contacts = new Set<string>();

		const contactsEvent = await get({ kinds: [3], authors: [$pubkey] });
		if (!contactsEvent) return;
		const tags = contactsEvent.tags as [string, string][];
		tags.forEach(([, id]) => {
			contacts.add(id);
		});

		return [...contacts];
	};
</script>

{#await getContracts()}
	<p>Loading...</p>
{:then contacts}
	{#if contacts}
		<TimeLine
			authors={contacts}
			filter={{
				since: Math.round(
					new Date().setMinutes(new Date().getMinutes() - 10) / 1000
				)
			}}
		/>
	{/if}
{/await}
