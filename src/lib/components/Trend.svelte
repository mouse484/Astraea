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

<section>
	<h2 class="text-2xl">
		<a href="/trend">Trend</a>
	</h2>
	<div>
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
			powerd by <a
				class="text-blue-600 visited:text-purple-600"
				href="https://nostrbuzzs.deno.dev/"
			>
				nostrbuzzs
			</a>
		</p>
	</div>
</section>
