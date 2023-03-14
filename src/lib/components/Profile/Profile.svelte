<script lang="ts">
	import { profiles, type ProfileData } from '$lib/data/profiles';
	import { get } from '$lib/utils/nostr';
	import Icon from '@iconify/svelte';
	import { onMount } from 'svelte';
	import CopyButton from '../CopyButton.svelte';
	import ProfileMenu from './ProfileMenu.svelte';

	export let npubHex: string;
	export let imageOnly = false;
	export let detail = false;
	export let to = `/profile/${npubHex}`;

	let profile: ProfileData | undefined = { name: 'loading' };
	let isMenuOpen = false;

	onMount(async () => {
		const p = $profiles.get(npubHex);
		if (p) return (profile = p);
		const event = await get({ kinds: [0], authors: [npubHex] });
		if (!event) return (profile = { name: 'error' });
		const parsed = JSON.parse(event.content);
		profiles.update((updater) => updater.set(npubHex, parsed));
		profile = parsed;
	});

	$: [name, domain] = (profile?.nip05 || `@${profile?.name || ''}`).split('@');
	$: maxWitdh =
		name.length > 20
			? domain.length > 10
				? 'max-w-[5em]'
				: 'max-w-[10em]'
			: '';
</script>

{#key profile}
	<div>
		{#if detail}
			{#if profile?.banner}
				<div class="mb-12 max-h-[30vh] overflow-clip flex items-center">
					<img class="object-cover w-full" src={profile.banner} alt="" />
				</div>
			{/if}
		{/if}
		<div class="flex justify-between">
			<a class="flex gap-2 text-inherit visited:text-inherit w-fit" href={to}>
				<img
					class="w-12 h-12 rounded"
					src={profile?.picture}
					alt={profile?.name}
				/>
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
						<div class="flex mt-2 text-xs text-gray-500">
							<div class="truncate ... {maxWitdh}">
								{name}
							</div>
							<div>@</div>
							<div>{domain}</div>
						</div>
					</div>
				{/if}
			</a>
			{#if detail}
				<ProfileMenu />
			{/if}
		</div>

		{#if detail}
			<div>
				<div class="mt-4 break-words">{profile?.about || ''}</div>
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
{/key}
