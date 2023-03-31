<script lang="ts">
	import { goto } from '$app/navigation';
	import Button from '$lib/components/elements/form/Button.svelte';
	import Heading from '$lib/components/elements/Heading.svelte';
	import Section from '$lib/components/elements/Section.svelte';
	import { pubkey } from '$lib/store/pubkey';
	import { removeLocalStorage, setLocalStorage } from '$lib/utils/localStorage';
	import { _ } from 'svelte-i18n';

	const logout = () => {
		pubkey.set('');
		removeLocalStorage('pubkey');

		goto('/');
	};
</script>

<Heading>{$_('setting.setting')}</Heading>

<Section>
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
