<script lang="ts">
	import Profile from '$lib/components/Profile.svelte';
	import TimeLine from '$lib/components/TimeLine.svelte';
	import type { PageData } from './$types';
	import type { response } from './+page';

	export let data: PageData;

	let { npubHex } = data as response;
</script>

{#if npubHex}
	<Profile {npubHex} detail={true} />

	<section class="mt-12">
		<TimeLine authors={[npubHex]} filter={{ limit: 20 }} />
	</section>
{/if}
