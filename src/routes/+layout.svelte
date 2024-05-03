<script lang="ts">
	import 'virtual:uno.css';
	import '@unocss/reset/tailwind-compat.css';

	import '$lib/utils/i18n';
	import Menu from '$lib/components/Menu/Menu.svelte';
</script>

<div class="min-h-screen flex gap-8 bg-main text-main">
	<Menu />
	<main class="ml-32 max-w-2xl w-full">
		<slot />
	</main>
</div>
