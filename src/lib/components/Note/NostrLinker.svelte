<script lang="ts">
	import type { DecodeResult } from 'nostr-tools/lib/nip19';
	import Mention from './Mention.svelte';
	import Note from './Note.svelte';

	export let token: { type: 'nostr'; value: DecodeResult };

	$: value = token.value;
</script>

{#if value.type === 'note'}
	<Note id={value.data} />
{:else if value.type === 'nevent'}
	<Note id={value.data.id} />
{:else if value.type === 'npub'}
	<Mention pubkey={value.data} />
{:else}
	<p class="text-pink-300">{value.type}:{value.data}</p>
{/if}
