<script lang="ts">
	import TimeLine from '$lib/components/TimeLine.svelte';
	import Icon from '$lib/components/elements/Icon.svelte';
	import type { PageData } from './$types';

	const { data }: { data: PageData } = $props();

	const { profile } = data;
</script>

<div class="w-full">
	<section>
		<img src={profile.banner} alt="{profile.name} banner" class="h-48 w-full object-cover" />
		<img src={profile.image} alt="{profile.name} icon" class="size-24 rounded-md" />
		<div>
			<h2 class="text-lg">{profile.name}</h2>
			<p class={data.isNip05Valid ? 'text-green' : 'text-red'}>{profile.nip05}</p>
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
		</div>
	</section>

	<section class="sticky top-0 pt-16">
		<TimeLine />
	</section>
</div>
