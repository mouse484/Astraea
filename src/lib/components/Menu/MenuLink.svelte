<script context="module" lang="ts">
	import type { Snippet } from 'svelte';
	type Props = {
		href: string;
		icon: string;
		children: Snippet;
	};
</script>

<script lang="ts">
	import Icon from '../elements/Icon.svelte';
	import { page } from '$app/stores';
	const { href, icon, children }: Props = $props();

	// eslint-disable-next-line svelte/valid-compile
	const isCurrentPage = $page.url.pathname === href;
</script>

<a {href} class="flex items-center gap-2 rounded-md p-2{isCurrentPage && ' shadow-inner'}">
	<Icon name={icon} size="2" />
	{@render children()}
</a>
