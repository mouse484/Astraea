<script lang="ts">
	import Header from '$lib/components/header/Header.svelte';
	import { appClass } from '$lib/styles/App.css';
</script>

<div class={appClass}>
	<Header />
	<slot />
</div>
