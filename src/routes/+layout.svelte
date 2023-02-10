<script lang="ts">
	import Relay from '$lib/components/Relay.svelte';
	import { appClass } from '$lib/styles/App.css';
</script>

<div class={appClass}>
	<Relay />
	<slot />
</div>
