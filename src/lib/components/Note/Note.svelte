<script lang="ts">
	import type { Event } from 'nostr-tools';
	import Profile from '../Profile/Profile.svelte';
	import Content from './Content.svelte';

	export let event: Event;
</script>

{#if event}
	<div class="border p-2 m-2 rounded">
		<Profile pubkey={event.pubkey} detail={false} />
		<div class="mt-4">
			<Content rawContent={event.content} tags={event.tags} />
		</div>
	</div>
{/if}
