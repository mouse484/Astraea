<script lang="ts">
	import Icon from '$lib/components/elements/Icon.svelte';
	import Responsive from '$lib/components/elements/Responsive.svelte';
	import Main from '$lib/components/Main.svelte';
	import NoteForm from '$lib/components/Note/NoteForm/NoteForm.svelte';
	import TimeLine from '$lib/components/TimeLine/TimeLine.svelte';
	import { useRelays } from '$lib/nostr/relays';
	import { contactsQuery } from '$lib/query/contacts';
	import { pubkey } from '$lib/store/pubkey';
	import { _ } from 'svelte-i18n';

	const readRelays = useRelays('read');

	$: query = contactsQuery($pubkey, readRelays);
	$: contacts = ($pubkey && $query.data) || ('ALL' as const);
</script>

<Main title={$_('home.home')}>
	<div slot="top" class="mt-4">
		<Responsive breakpoint="sm">
			<NoteForm />
		</Responsive>
	</div>
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
			/>
		{/key}
		<Responsive breakpoint="sm" than="less">
			<a href="/post" class="btn btn-primary absolute right-4 bottom-20 rounded-full w-14 h-14">
				<Icon name="quill" />
			</a>
		</Responsive>
	{/if}
</Main>
