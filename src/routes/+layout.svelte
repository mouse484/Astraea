<script lang="ts">
	import Header from '$lib/components/header/Header.svelte';
	import Relay from '$lib/components/Relay.svelte';
	import { appClass } from '$lib/styles/App.css';
</script>

<div class={appClass}>
	<Header />
	<Relay />
	<slot />
</div>
