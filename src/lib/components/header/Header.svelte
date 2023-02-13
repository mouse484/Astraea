<script lang="ts">
	import { goto } from '$app/navigation';
	import { buttonClass } from '$lib/styles/util.css';
	import { headerClass, itemsClass } from './Header.css';
</script>

<div class={headerClass}>
	<h1>お試しNostr client</h1>
	<div class={itemsClass}>
		<button class={buttonClass} on:click={() => goto('/')}>Home</button>
		<button class={buttonClass} on:click={() => goto('/relay/info')}>
			Relay Info</button
		>
	</div>
</div>
