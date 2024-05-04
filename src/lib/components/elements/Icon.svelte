<script context="module" lang="ts">
	type Props = {
		name: string;
		iconset?: string;
		size?: '1' | '2' | '4' | '8';
		className?: string;
	};
</script>

<script lang="ts">
	import Icon from '@iconify/svelte';

	const { name, iconset = 'mdi', size = '2', className = '' }: Props = $props();
</script>

<div class="text-{size}xl {className}">
	<Icon icon="{iconset}:{name}" style="font-size: {size}rem" />
</div>
