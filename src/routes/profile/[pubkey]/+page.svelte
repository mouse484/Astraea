<script lang="ts">
	import Section from '$lib/components/elements/Section.svelte';
	import Profile from '$lib/components/Profile/Profile.svelte';
	import TimeLine from '$lib/components/TimeLine.svelte';
	import type { PageData } from './$types';
	export let data: PageData;
	$: pubkey = data.pubkey;
</script>

{#if pubkey}
	<Profile {pubkey} detail={true} />
	<Section>
		<TimeLine authors={[pubkey]} />
	</Section>
{/if}
