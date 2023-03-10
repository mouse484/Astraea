<script lang="ts">
	import { pool } from '$lib/utils/nostr';
	import type { Event } from 'nostr-tools';
	import { onMount } from 'svelte';

	let trends: string[] = [];

	onMount(async () => {
		const sub = pool.sub(
			['wss://nostrbuzzs-relay.fly.dev/'],
			[{ kinds: [38225], limit: 1 }]
		);
		sub.on('event', (event: Event) => {
			const parsed = JSON.parse(event.content) as {
				phrases: { text: string }[];
			};
			trends = parsed.phrases.map(({ text }) => {
				return text;
			});
		});
	});
</script>

<h2 class="text-2xl">Trend</h2>
<ul class="mt-4">
	{#key trends}
		{#each trends as trend}
			<li class="px-4 py-2 m-2 rounded border">{trend}</li>
		{/each}
	{/key}
</ul>
