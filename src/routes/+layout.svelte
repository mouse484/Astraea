<script lang="ts">
	import '../app.css';
	import Header from '$lib/components/Header.svelte';
	import { browser } from '$app/environment';
	import { QueryClient, QueryClientProvider } from '@tanstack/svelte-query';
	import IsLogin from '$lib/components/IsLogin.svelte';

	export const queryClient = new QueryClient({
		defaultOptions: {
			queries: {
				enabled: browser
			}
		}
	});
</script>

<svelte:head>
	<title>Astraea</title>
</svelte:head>

<QueryClientProvider client={queryClient}>
	<div class="m-4">
		<Header />
		<section class="m-4">
			<IsLogin>
				<slot />
			</IsLogin>
		</section>
	</div>
</QueryClientProvider>
