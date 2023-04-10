<script lang="ts">
	import { relaysQuery } from '$lib/query/relays';

	export let pubkey: string;
	const query = relaysQuery(pubkey);
</script>

{#key $query}
	<slot />
{/key}
