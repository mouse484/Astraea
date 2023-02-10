<script lang="ts">
	import { goto } from '$app/navigation';
	import Relay from '$lib/components/Relay.svelte';
	import { appClass } from '$lib/styles/App.css';
</script>

<div class={appClass}>
	<button on:click={() => goto('/')}>go home</button>
	<Relay />
	<slot />
</div>
