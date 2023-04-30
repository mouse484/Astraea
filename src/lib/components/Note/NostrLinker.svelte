<script lang="ts">
	import type { DecodeResult } from 'nostr-tools/lib/nip19';
	import Note from './Note.svelte';

	export let token: { type: 'nostr'; decoded: DecodeResult };

	$: type = token.decoded.type;
	$: id = token.decoded.data as string;
</script>

{#if type === 'note'}
	<Note {id} />
{/if}
