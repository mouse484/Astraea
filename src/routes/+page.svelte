<script lang="ts">
	import Heading from '$lib/components/elements/Heading.svelte';
	import Section from '$lib/components/elements/Section.svelte';
	import NoteForm from '$lib/components/Note/NoteForm.svelte';
	import TimeLine from '$lib/components/TimeLine/TimeLine.svelte';
	import Title from '$lib/components/Title.svelte';
	import { useRelays } from '$lib/nostr/relays';
	import { contactsQuery } from '$lib/query/contacts';
	import { pubkey } from '$lib/store/pubkey';
	import { _ } from 'svelte-i18n';

	const readRelays = useRelays('read');

	$: contacts = contactsQuery($pubkey, readRelays);
</script>

<Title pageTitle={$_('home.home')} />

{#if $contacts.data && readRelays}
	<div class="flex gap-4">
		<div>
			<Heading>{$_('home.home')}</Heading>

			<div class="m-4 mb-8">
				<NoteForm />
			</div>

			<Section>
				<TimeLine
					relays={readRelays}
					contacts={$contacts.data}
					filter={{
						since: Math.floor(
							new Date(new Date().setHours(new Date().getHours() - 1)).getTime() / 1000
						)
					}}
				/>
			</Section>
		</div>
	</div>
{/if}
