<script lang="ts">
	import { goto } from '$app/navigation';
	import Button from '$lib/components/elements/form/Button.svelte';
	import Heading from '$lib/components/elements/Heading.svelte';
	import Icon from '$lib/components/elements/Icon.svelte';
	import Section from '$lib/components/elements/Section.svelte';
	import Title from '$lib/components/Title.svelte';
	import RelayInfo from '$lib/pages/setting/RelayInfo.svelte';
	import { relaysQuery } from '$lib/query/relays';
	import { pubkey } from '$lib/store/pubkey';
	import { theme } from '$lib/store/theme';
	import { removeLocalStorage } from '$lib/utils/localStorage';
	import { _ } from 'svelte-i18n';

	const relays = relaysQuery($pubkey);

	const logout = () => {
		pubkey.set('');
		removeLocalStorage('pubkey');

		goto('/');
	};
</script>

<Title pageTitle={$_('setting.setting')} />

<Heading>{$_('setting.setting')}</Heading>

<Section>
	<div>
		<Heading h={3}>
			{$_('setting.theme')}
		</Heading>

		<div class="flex">
			<label class={$theme === 'light' ? 'text-blue-400' : 'cursor-pointer'}>
				<input type="radio" bind:group={$theme} name="theme" value="light" class="hidden" />
				<Icon name="white-balance-sunny" />
			</label>
			<label class={$theme === 'dark' ? 'text-blue-400' : 'cursor-pointer'}>
				<input type="radio" bind:group={$theme} name="theme" value="dark" class="hidden" />
				<Icon name="moon-waxing-crescent" />
			</label>
		</div>
	</div>

	<div>
		<Heading h={3}>
			{$_('general.relays')}
		</Heading>
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
				{#if $relays.data}
					{#each Object.entries($relays.data) as [relay, { read, write }]}
						<tr>
							<td>{relay}</td>
							<td>{read}</td>
							<td>{write}</td>
							<td>
								<RelayInfo relayUrl={relay} />
							</td>
						</tr>
					{/each}
				{/if}
			</tbody>
		</table>
	</div>

	<div>
		<Heading h={3}>
			{$_('setting.logout')}
		</Heading>
		<div class="m-4">
			<Button on:click={logout}>
				{$_('setting.logout')}
			</Button>
		</div>
	</div>
</Section>
