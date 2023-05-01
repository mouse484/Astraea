<script lang="ts">
	import Note from "./Note.svelte";

	export let token: { type: 'nostr'; ntype: string; text: string };

	$: type = token.ntype;
	$: id = token.text;
</script>

{#if type === 'note'}
	<Note {id} />
{:else}
	<p class="text-pink-300">{type}:{id}</p>
{/if}
