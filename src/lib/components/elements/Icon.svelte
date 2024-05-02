<script context="module" lang="ts">
	type Props = {
		name: string;
		iconset?: string;
		size?: '1' | '2' | '4' | '8';
	};
</script>

<script lang="ts">
	import Icon from '@iconify/svelte';

	const { name, iconset = 'mdi', size = '2' }: Props = $props();
</script>

<div class="text-{size}xl">
	<Icon icon="{iconset}:{name}" style="font-size: {size}rem" />
</div>
