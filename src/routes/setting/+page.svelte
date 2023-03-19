<script lang="ts">
	import { goto } from '$app/navigation';
	import Button from '$lib/components/elements/Button.svelte';
	import Heading from '$lib/components/elements/Heading.svelte';
	import Section from '$lib/components/elements/Section.svelte';
	import { pubkeyClear } from '$lib/store/setting';
</script>

<Heading>設定</Heading>

<Section>
	<h3>ログアウト</h3>
	<Button
		on:click={() => {
			pubkeyClear();
			goto('/');
		}}>ログアウト</Button
	>
</Section>
