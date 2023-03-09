<script lang="ts">
	import { profiles, type ProfileData } from '$lib/data/profiles';
	import { get } from '$lib/utils/nostr';
	import { onMount } from 'svelte';

	export let npubHex: string;
	export let imageOnly = false;
	export let detail = false;
	export let to = `/profile/${npubHex}`;

	let profile: ProfileData | undefined = { name: 'loading' };

	onMount(async () => {
		const p = $profiles.get(npubHex);
		if (p) return (profile = p);
		const event = await get({ kinds: [0], authors: [npubHex] });
		if (!event) return (profile = { name: 'error' });
		const parsed = JSON.parse(event.content);
		profiles.update((updater) => updater.set(npubHex, parsed));
		profile = parsed;
	});
</script>

{#key profile}
	<div>
		{#if detail}
			{#if profile?.banner}
				<img class="h-72 w-full mb-4" src={profile.banner} alt="" />
			{/if}
		{/if}
		<a class="flex text-inherit visited:text-inherit w-fit" href={to}>
			<img
				class="h-12 w-12 rounded"
				src={profile?.picture}
				alt={profile?.name}
			/>
			{#if !imageOnly}
				<div class="pl-4">
					<!-- まだページ作ってないから# -->
					{profile?.display_name || profile?.name}
					<div class="text-xs text-gray-500">
						{profile?.nip05 || `@${profile?.name}`}
					</div>
				</div>
			{/if}
		</a>
		{#if detail}
			<div>
				<div class="mt-4 break-words">{profile?.about || ''}</div>
				{#if profile?.website}
					<a
						class="mt-2"
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
