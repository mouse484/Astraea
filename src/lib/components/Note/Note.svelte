<script lang="ts">
	import { useRelays } from '$lib/nostr/pool';
	import { noteQuery } from '$lib/query/note';
	import { relaysQuery } from '$lib/query/relays';
	import { pubkey } from '$lib/store/pubkey';

	export let id: string;

	const relays = relaysQuery($pubkey);

	$: readRelays = useRelays($relays.data, 'read');

	$: note = readRelays && noteQuery(id, readRelays);

	$: event = $note.data;
</script>

{#if event}
	<p>
		{event?.content}
	</p>
{/if}
