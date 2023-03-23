<script lang="ts">
	import { goto } from '$app/navigation';
	import Button from '$lib/components/elements/Button.svelte';
	import Heading from '$lib/components/elements/Heading.svelte';
	import Section from '$lib/components/elements/Section.svelte';
	import RelayInfo from '$lib/components/RelayInfo.svelte';
	import { pubkeyClear, relays } from '$lib/store/setting';
	import { locale, locales, _ } from 'svelte-i18n';
</script>

<Heading>{$_('setting.setting')}</Heading>

<Section>
	<h3>{$_('general.relays')}</h3>
	<table class="table-auto border-spacing-4">
		<thead>
			<tr>
				<th>url</th>
				<th>read</th>
				<th>write</th>
				<th>{$_('general.info')}</th>
			</tr>
		</thead>
		<tbody>
			{#each Object.entries($relays) as [relay, { read, write }]}
				<tr>
					<td>{relay}</td>
					<td>{read}</td>
					<td>{write}</td>
					<td><RelayInfo relayUrl={relay} /></td>
				</tr>
			{/each}
		</tbody>
	</table>

	<h3 class="mt-8 text-2xl">{$_('setting.language')}</h3>
	<select class="mt-4" name="locale" id="locale" bind:value={$locale}>
		{#each $locales as item (item)}
			<option value={item}>{item}</option>
		{/each}
	</select>

	<h3 class="mt-8 text-2xl">{$_('setting.logout')}</h3>
	<Button
		on:click={() => {
			pubkeyClear();
			goto('/');
		}}
	>
		{$_('setting.logout')}
	</Button>
</Section>
