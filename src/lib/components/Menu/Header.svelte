<script lang="ts">
	import Icon from '../elements/Icon.svelte';
	import Title from './Title.svelte';
</script>

<header class="flex sticky top-0 z-30 justify-between items-center p-8 bg-base-100">
	<Title />
	<a href="/setting">
		<Icon name="cog" size="2" />
	</a>
</header>
