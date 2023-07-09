<script lang="ts">
	import { goto } from '$app/navigation';
	import Main from '$lib/components/Main.svelte';
	import Heading from '$lib/components/elements/Heading.svelte';
	import Icon from '$lib/components/elements/Icon.svelte';
	import Section from '$lib/components/elements/Section.svelte';
	import CustomEmojiSetting from '$lib/pages/setting/CustomEmojiSetting.svelte';
	import RelayInfo from '$lib/pages/setting/RelayInfo.svelte';
	import { relaysQuery } from '$lib/query/relays';
	import { pubkey } from '$lib/store/pubkey';
	import { getLocalStorage, removeLocalStorage } from '$lib/utils/localStorage';
	import { onMount } from 'svelte';
	import { _ } from 'svelte-i18n';
	import { themeChange } from 'theme-change';

	const relays = relaysQuery($pubkey);
	let theme = 'light';

	const themeUpdate = () => {
		theme = getLocalStorage('theme') || theme;
	};

	onMount(() => {
		themeChange(false);
		themeUpdate();
	});

	const logout = () => {
		pubkey.set('');
		removeLocalStorage('pubkey');

		goto('/');
	};
</script>

<Main title={$_('setting.setting')}>
	<div>
		<Heading h={3}>
			{$_('setting.theme')}
		</Heading>

		<Section>
			<!-- themeChangeがクリックイベントを奪うので親で変更を検知するために -->
			<button class="flex" on:click={() => themeUpdate()}>
				<button
					data-set-theme="light"
					data-act-class="ACTIVECLASS"
					class={theme === 'light' ? 'text-info' : ''}
				>
					<Icon name="white-balance-sunny" />
				</button>
				<button
					data-set-theme="dark"
					data-act-class="ACTIVECLASS"
					class={theme === 'dark' ? 'text-info' : ''}
				>
					<Icon name="moon-waxing-crescent" />
				</button>
			</button>
		</Section>
	</div>

	<div>
		<Heading h={3}>
			{$_('general.relays')}
		</Heading>

		<Section>
			<div class="overflow-scroll h-80">
				<table class="table">
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
		</Section>
	</div>

	<div>
		<Heading h={3}>
			{$_('emoji.emoji')}
		</Heading>

		<Section>
			<CustomEmojiSetting />
		</Section>
	</div>

	<div>
		<Heading h={3}>
			{$_('setting.logout')}
		</Heading>

		<Section>
			<button on:click={logout} class="btn btn-error">
				{$_('setting.logout')}
			</button>
		</Section>
	</div>
</Main>
