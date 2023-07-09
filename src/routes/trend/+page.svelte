<script lang="ts">
	import Main from '$lib/components/Main.svelte';
	import Trend from '$lib/components/Trend.svelte';
	import { _ } from 'svelte-i18n';
</script>

<Main title={$_("trend.trend")}>
	<Trend />
</Main>
