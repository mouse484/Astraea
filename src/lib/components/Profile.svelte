<script lang="ts">
	import { get } from '$lib/utils/nostr';

	export let npubHex: string;
	export let imageOnly = false;
</script>

{#await get({ kinds: [0], authors: [npubHex] }) then event}
	{#if event}
		{@const profile = JSON.parse(event.content)}
		<div class="flex">
			<img class="h-12 rounded" src={profile?.picture} alt={profile?.name} />
			{#if !imageOnly}
				<div class="pl-4">
					<a href="#後で">
						{profile?.display_name || profile?.name}
					</a>
					<div class="text-xs text-gray-500">
						{profile?.nip05 || `@${profile?.name}`}
					</div>
				</div>
			{/if}
		</div>
	{/if}
{/await}
