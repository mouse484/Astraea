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

	const isCurrentPage =
		// eslint-disable-next-line svelte/valid-compile
		$derived(href === '/' ? $page.url.pathname === '/' : $page.url.pathname.startsWith(href));
</script>

<a {href} class="flex items-center gap-2 rounded-md p-2">
	<Icon name={isCurrentPage ? icon : `${icon}-outline`} size="2" />
	<span class={isCurrentPage ? 'font-bold' : ''}>
		{@render children()}
	</span>
</a>
