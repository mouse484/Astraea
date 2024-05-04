<script lang="ts">
	import 'virtual:uno.css';
	import '@unocss/reset/tailwind-compat.css';
	import '$lib/utils/i18n';

	import Menu from '$lib/components/Menu/Menu.svelte';
	import Icon from '$lib/components/elements/Icon.svelte';

	import { nostr } from '$lib/stores/nostr.svelte';
	import { setLoginUser } from '$lib/utils/ndk';

	const { children } = $props();

	let isLoading = $state(true);

	$effect(() => {
		(async () => {
			const { ndk } = nostr;
			await ndk.connect();
			await setLoginUser(ndk);
			isLoading = false;
		})();
	});
</script>

<div class="min-h-screen flex gap-8 bg-main text-main">
	{#if isLoading}
		<div class="grid w-full place-items-center">
			<Icon name="loading" className="animate-spin" />
		</div>
	{:else}
		<Menu />
		<main class="ml-32 max-w-2xl w-full">
			{@render children()}
		</main>
	{/if}
</div>
