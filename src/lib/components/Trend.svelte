<script lang="ts">
	import { pool } from '$lib/nostr/pool';
	import { onMount } from 'svelte';
	import { _ } from 'svelte-i18n';
	import Heading from './elements/Heading.svelte';
	import Section from './elements/Section.svelte';

	let trends: string[] = [];

	onMount(async () => {
		const unsub = pool.subscribe(
			[{ kinds: [38225], limit: 1 }],
			['wss://nostrbuzzs-relay.fly.dev/'],
			(event) => {
				const parsed = JSON.parse(event.content) as {
					phrases: { text: string }[];
				};
				trends = parsed.phrases.map(({ text }) => {
					return text;
				});
			},
			undefined,
			() => unsub()
		);
	});
</script>

<Heading h={2}>
	<a href="/trend">{$_('trend.trend')}</a>
</Heading>

<Section>
	<ul class="mt-4">
		{#key trends}
			{#each trends as trend}
				<a href="/search?q={trend}">
					<li class="p-2 my-2 rounded border md:w-60">
						{trend}
					</li>
				</a>
			{/each}
		{/key}
	</ul>
	<p class="mt-4 text-right">
		powerd by <a class="text-blue-600 visited:text-purple-600" href="https://nostrbuzzs.deno.dev/">
			nostrbuzzs
		</a>
	</p>
</Section>
