<script lang="ts">
	import { createQuery } from '@tanstack/svelte-query';

	export let href: string;

	const query = createQuery({
		queryKey: ['ogp', href],
		queryFn: async () => {
			const response = await fetch(`/api/ogp?url=${encodeURIComponent(href)}`).catch((err) =>
				console.log(err)
			);
			const result = await response?.json().catch((err) => console.log(err));
			return result;
		}
	});
	$: data = $query.data;
</script>

{#if data}
	<div class="card card-compact m-2 max-w-[96em] bg-base-100 shadow-xl text-primary-content">
		{#if data?.open_graph?.images?.[0]}
			{@const image = data?.open_graph.images[0]}
			<figure><img src={image.url} alt={image.alt} /></figure>
		{/if}
		<div class="card-body">
			{#if data?.open_graph?.site_name}
				<p class="flex items-center gap-4">
					{#if data?.favicon}
						<img src={data.favicon} alt={data?.title} class="h-4" />
					{/if}
					{data.open_graph.site_name}
				</p>
			{/if}
			<h2 class="card-title">{data?.title}</h2>
			{#if data?.description}
				<p>{data.description}</p>
			{/if}
		</div>
	</div>
{/if}
