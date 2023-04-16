<script lang="ts">
	import Icon from '@iconify/svelte';

	export let name: string;
	export let size: '2' | '4' | '8' = '2';
</script>

<div class="text-{size}xl">
	<Icon icon="mdi:{name}" style="font-size: {size}rem" />
</div>
