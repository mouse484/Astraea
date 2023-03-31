<script lang="ts">
	import Heading from '$lib/components/elements/Heading.svelte';
	import Section from '$lib/components/elements/Section.svelte';
	import TimeLine from '$lib/components/TimeLine/TimeLine.svelte';
	import Title from '$lib/components/Title.svelte';
	import { useRelays } from '$lib/nostr/pool';
	import { contactsQuery } from '$lib/query/contacts';
	import { pubkey } from '$lib/store/pubkey';
	import { _ } from 'svelte-i18n';

	const readRelays = useRelays('read');

	$: contacts = contactsQuery($pubkey, readRelays);
</script>

<Title pageTitle={$_('home.home')} />

<Heading>{$_('home.home')}</Heading>

<Section>
	{#if $contacts.data && readRelays}
		<TimeLine
			relays={readRelays}
			contacts={$contacts.data}
			filter={{
				since: Math.floor(new Date(new Date().setHours(new Date().getHours() - 1)).getTime() / 1000)
			}}
		/>
	{/if}
</Section>
