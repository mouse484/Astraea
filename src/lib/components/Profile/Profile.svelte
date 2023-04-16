<script lang="ts">
	import { useRelays } from '$lib/nostr/relays';
	import { profileQuery } from '$lib/query/profile';
	import Icon from '@iconify/svelte';
	import { nip05 } from 'nostr-tools';

	export let pubkey: string;
	export let imageOnly = false;
	export let imageSize: 8 | 12 = 12;
	export let detail = false;
	export let to = `/profile/${pubkey}`;

	const query = profileQuery(pubkey, useRelays('read'));

	$: profile = $query.isError ? { name: 'error' } : $query.data;

	$: [name, domain] = (profile?.nip05 || `@${profile?.name || ''}`).split('@');
	$: maxWitdh = name.length > 20 ? (domain.length > 10 ? 'max-w-[5em]' : 'max-w-[10em]') : '';

	let nip05Status = false;
	$: {
		(async () => {
			if (!profile.nip05) return;
			const profilePointer = await nip05.queryProfile(profile.nip05);
			nip05Status = profilePointer?.pubkey === pubkey;
		})();
	}
</script>

<div>
	{#if detail}
		{#if profile?.banner}
			<div class="mb-12 max-h-[30vh] overflow-clip flex items-center">
				<img class="object-cover w-full" src={profile.banner} alt="" />
			</div>
		{/if}
	{/if}
	<div class="flex justify-between">
		<a class="flex gap-2 items-center text-inherit visited:text-inherit w-fit" href={to}>
			<div class="w-{imageSize} h-{imageSize}">
				{#if profile?.picture}
					<img class="rounded" src={profile.picture} alt={profile?.name} />
				{:else}
					<Icon icon="mdi:account" />
				{/if}
			</div>

			{#if !imageOnly}
				<div>
					<div>
						{#if profile?.display_name}
							{profile.display_name}
							{#if profile?.name}
								<span class="text-xs text-gray-500">@{profile.name}</span>
							{/if}
						{:else}
							{profile?.name}
						{/if}
					</div>
					<div class="flex items-center mt-2 text-xs text-gray-500">
						<span class="truncate ... {maxWitdh}">
							{name}
						</span>
						{#if nip05Status}
							<span class="text-blue-500">
								<Icon icon="mdi:check-decagram-outline" />
							</span>
						{:else}
							<span>@</span>
						{/if}
						<span>{domain}</span>
					</div>
				</div>
			{/if}
		</a>
		<!-- {#if detail}
			<Menu {pubkey} />
		{/if} -->
	</div>
	{#if detail}
		<div class="flex flex-col gap-4">
			<div class="mt-4 break-words">{profile?.about || ''}</div>
			<!-- <Badge {pubkey} /> -->
			{#if profile?.website}
				<a
					class="mt-2 break-words"
					href={profile.website}
					target="_blank"
					rel="noopener noreferrer"
				>
					{profile.website}
				</a>
			{/if}
		</div>
	{/if}
</div>
