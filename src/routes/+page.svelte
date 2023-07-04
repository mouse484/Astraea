<script lang="ts">
	import Heading from '$lib/components/elements/Heading.svelte';
	import Responsive from '$lib/components/elements/Responsive.svelte';
	import Section from '$lib/components/elements/Section.svelte';
	import NoteForm from '$lib/components/Note/NoteForm/NoteForm.svelte';
	import TimeLine from '$lib/components/TimeLine/TimeLine.svelte';
	import Title from '$lib/components/Title.svelte';
	import { useRelays } from '$lib/nostr/relays';
	import { contactsQuery } from '$lib/query/contacts';
	import { pubkey } from '$lib/store/pubkey';
	import { _ } from 'svelte-i18n';

	const readRelays = useRelays('read');

	$: query = contactsQuery($pubkey, readRelays);
	$: contacts = ($pubkey && $query.data) || ('ALL' as const);
</script>

<Title pageTitle={$_('home.home')} />

<Section>
	{#if readRelays}
		{#key contacts}
			<TimeLine
				relays={readRelays}
				authors={contacts}
				filter={{
					since: Math.floor(
						new Date(new Date().setHours(new Date().getHours() - 1)).getTime() / 1000
					)
				}}
			>
				<div slot="head">
					<Heading>{$_('home.home')}</Heading>

					<Responsive breakpoint="sm">
						<NoteForm />
					</Responsive>
				</div>
			</TimeLine>
		{/key}
	{/if}
</Section>
