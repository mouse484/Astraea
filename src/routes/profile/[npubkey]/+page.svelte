<script lang="ts">
	import Profile from '$lib/components/Profile.svelte';
	import TimeLine from '$lib/components/TimeLine.svelte';
	import type { PageData } from './$types';

	export let data: PageData;

	$: npubHex = data.npubHex;
</script>

{#key npubHex}
	{#if npubHex}
		<Profile {npubHex} detail={true} />

		<section class="mt-12">
			<TimeLine authors={[npubHex]} filter={{ limit: 20 }} />
		</section>
	{/if}
{/key}
