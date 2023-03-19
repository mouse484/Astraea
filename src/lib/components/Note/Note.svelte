<script lang="ts">
	import type { Event } from 'nostr-tools';
	import Content from './Content.svelte';

	export let event: Event;
</script>

{#if event}
	<div class="border p-2 m-2">
		<Content rawContent={event.content} tags={event.tags} />
	</div>
{/if}
