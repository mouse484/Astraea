<script lang="ts">
	import Icon from '@iconify/svelte';
</script>

<div class="flex flex-col items-center w-full">
	<Icon icon={'mdi:loading'} width={32} class="animate-spin" />
	<p class="mt-8">Loading <slot />...</p>
</div>
