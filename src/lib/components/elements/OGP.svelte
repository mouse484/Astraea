<script lang="ts">
	import { createQuery } from '@tanstack/svelte-query';
	import type { Metadata } from 'unfurl.js/dist/types';

	export let href: string;

	let favionLoad = true;

	const query = createQuery({
		queryKey: ['ogp', href],
		queryFn: async () => {
			const response = await fetch(`/api/ogp?url=${encodeURIComponent(href)}`).catch((err) =>
				console.log(err)
			);
			const result = await response?.json().catch((err) => console.log(err));
			return result as Metadata;
		}
	});
	$: data = $query.data;
	$: console.log(data);
</script>

{#if data}
	<div class="card card-compact m-2 w-96 max-w-fit bg-base-100 shadow-xl text-primary-content">
		{#if data?.open_graph?.images?.[0]}
			{@const image = data?.open_graph.images[0]}
			<figure><img src={image.url} alt={image.alt} /></figure>
		{/if}
		<div class="card-body">
			{#if data?.open_graph?.site_name}
				<p class="flex items-center gap-4">
					{#if favionLoad}
						{#if data?.favicon}
							<img
								class="h-4"
								src={data.favicon}
								alt={data?.title}
								on:error={() => (favionLoad = false)}
							/>
						{/if}
					{/if}
					{data.open_graph.site_name}
				</p>
			{/if}
			{#if data.title}
				<h2 class="card-title">{data.title}</h2>
			{/if}
			<div class="max-h-40 overflow-clip">
				{data.description || data.open_graph?.description || ''}
			</div>

			<p class="border-t border-dashed border-accent pt-1 text-right truncate ...">
				{data?.open_graph?.url || href}
			</p>
		</div>
	</div>
{/if}
