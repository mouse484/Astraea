<script lang="ts">
	import RelayInfo from '$lib/components/Relay/RelayInfo.svelte';
	import NDK, { NDKRelay } from '@nostr-dev-kit/ndk';

	const { ndk }: { ndk: NDK } = $props();

	let relays = $state<[string, NDKRelay][]>([]);

	// https://github.com/nostr-dev-kit/ndk/blob/master/ndk-svelte-components/src/lib/relay/RelayList.svelte
	$effect(() => {
		update();
		ndk.pool.on('connect', update);
		ndk.pool.on('relay:ready', update);
		ndk.pool.on('relay:connect', update);
		ndk.pool.on('relay:disconnect', update);

		return () => {
			ndk.pool.removeAllListeners();
		};
	});

	const update = () => {
		relays = [...ndk.pool.relays.entries()];
	};
</script>

<ul>
	{#each relays as [uri, relay]}
		<RelayInfo {uri} {relay} {ndk} />
	{/each}
</ul>
