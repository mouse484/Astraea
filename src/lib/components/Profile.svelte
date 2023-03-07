<script lang="ts">
	import { get } from '$lib/utils/nostr';
	import { onMount } from 'svelte';

	export let npubHex: string;
	export let imageOnly = false;
</script>

{#await get({ kinds: [0], authors: [npubHex] }) then event}
	{#if event}
		{@const profile = JSON.parse(event.content)}
		<img src={profile?.picture} alt={profile?.name} />
		{#if !imageOnly}
			<div>
				<a href="後で">
					{profile?.display_name || profile?.name}
				</a>
				<div>{profile?.nip05 || `@${profile?.name}`}</div>
			</div>
		{/if}
	{/if}
{/await}
