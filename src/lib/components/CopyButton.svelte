<script lang="ts">
	import Button from './elements/Button.svelte';

	export let content: string;

	const onClick = async () => {
		await navigator.clipboard.writeText(content);
	};
</script>

<Button on:click={onClick}>
	<slot />
</Button>
