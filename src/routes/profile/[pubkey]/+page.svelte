<script lang="ts">
	import TimeLine from '$lib/components/TimeLine.svelte';
	import Icon from '$lib/components/elements/Icon.svelte';
	import i18next from 'i18next';
	import type { PageData } from './$types';

	const { data }: { data: PageData } = $props();

	let profile = $derived(data.profile);
</script>

<div>
	<section>
		<img src={profile.banner} alt="{profile.name} banner" class="h-48 w-full object-cover" />
		<img src={profile.image} alt="{profile.name} icon" class="ml-4 mt--16 size-24 rounded-md" />
		<div class="ml-4">
			<h2 class="text-2xl">{profile.name}</h2>
			<p class={data.isNip05Valid ? 'text-green' : 'text-red'}>{profile.nip05}</p>
			<p class="text-sm">{data.user.npub}</p>
			<p class="mt-4">{profile.about}</p>
			<div class="mt-2">
				{#if profile.website}
					<a href={profile.website} class="flex items-center gap-2">
						<Icon name="link" size="1" />
						{profile.website}
					</a>
				{/if}
				{#if profile.lud16}
					<p class="flex items-center gap-2">
						<Icon name="thunder" size="1" />
						{profile.lud16}
					</p>
				{/if}
			</div>
			<p class="mt-2">{data.follows.size} {i18next.t('profile.follows')}</p>
		</div>
	</section>

	<section class="sticky top-0 mt-16 h-screen">
		<TimeLine />
	</section>
</div>
