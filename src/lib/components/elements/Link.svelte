<script lang="ts">
	export let href: string;
	export let target: '_blank' | '' = '';
	export let rel: 'noopener noreferrer' | '' = '';
</script>

<a {href} {target} {rel} class="text-blue-400 visited:text-purple-400">
	<slot />
</a>
