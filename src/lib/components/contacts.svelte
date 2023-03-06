<script lang="ts">
	import { contacts } from '$lib/data/profile';
	import { relayPool } from '$lib/utils/relay';
	import { onMount } from 'svelte';

	export let npubHex: string;

	onMount(() => {
		relayPool.subscribe(3, { authors: [npubHex] }).on((event) => {
			const tags = event.tags as [string, string][];
			contacts.update((updater) =>
				updater.length < tags.length ? tags : updater
			);
		});
	});
</script>
