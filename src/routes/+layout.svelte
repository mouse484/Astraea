<script lang="ts">
	import 'virtual:uno.css';
	import '@unocss/reset/tailwind-compat.css';

	import '$lib/utils/i18n';
	import Menu from '$lib/components/Menu/Menu.svelte';
</script>

<div class="h-screen flex gap-8 overflow-clip p-8 bg-main text-main">
	<Menu />
	<slot />
</div>
