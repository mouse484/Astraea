<script lang="ts">
	import { subscribeEvents } from '$lib/nostr/pool';
	import { onMount } from 'svelte';
	import Section from './elements/Section.svelte';

	let trends: string[] = [];

	onMount(async () => {
		const sub = subscribeEvents(38225, { limit: 1 }, ['wss://nostrbuzzs-relay.fly.dev/'], {
			eoseUnsub: true
		});
		sub.on('event', (event) => {
			const parsed = JSON.parse(event.content) as {
				phrases: { text: string }[];
			};
			trends = parsed.phrases.map(({ text }) => {
				return text;
			});
		});
	});
</script>

<Section>
	<ul class="overflow-y-scroll w-full">
		{#key trends}
			{#each trends as trend}
				<a href="/search?q={trend}">
					<li class="p-2 my-2 rounded border lg:w-60">
						{trend}
					</li>
				</a>
			{/each}
		{/key}
	</ul>
	<p class="mt-4 text-right">
		powerd by
		<a class="text-blue-600 visited:text-purple-600" href="https://nostrbuzzs.deno.dev/">
			nostrbuzzs
		</a>
	</p>
</Section>
