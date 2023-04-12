<script lang="ts">
	export let href: string;
</script>

<a {href} class="text-blue-400 visited:text-purple-400">
	<slot />
</a>
