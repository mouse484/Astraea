<script lang="ts">
	import { goto } from '$app/navigation';
	import Button from '$lib/components/elements/Button.svelte';
	import Heading from '$lib/components/elements/Heading.svelte';
	import Section from '$lib/components/elements/Section.svelte';
	import RelayInfo from '$lib/components/RelayInfo.svelte';
	import { useRelays } from '$lib/store/setting';
	import type { QueryClient } from '@tanstack/svelte-query';
	import { getContext } from 'svelte';

	const relays = useRelays();

	const queryClient: QueryClient = getContext('$$_queryClient');
	const logout = () => {
		localStorage.removeItem('pubkey');
		queryClient.resetQueries(['pubkey']);
		goto('/');
	};
</script>

<Heading>設定</Heading>

<Section>
	<h3>Relays</h3>
	<table class="table-auto border-spacing-4">
		<thead>
			<tr>
				<th>url</th>
				<th>read</th>
				<th>write</th>
				<th>info</th>
			</tr>
		</thead>
		<tbody>
			{#each Object.entries($relays.data) as [relay, { read, write }]}
				<tr>
					<td>{relay}</td>
					<td>{read}</td>
					<td>{write}</td>
					<td> <RelayInfo relayUrl={relay} /></td>
				</tr>
			{/each}
		</tbody>
	</table>

	<h3>ログアウト</h3>
	<Button on:click={logout}>ログアウト</Button>
</Section>
