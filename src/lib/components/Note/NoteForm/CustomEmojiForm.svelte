<script lang="ts">
	import { customEmojis, getCustomEmojis } from '$lib/store/customEmoji';
	import { onMount } from 'svelte';
	import { _ } from 'svelte-i18n';

	export let emojis: [string, string, string][];

	let selectedEmojis: string[] = [];

	$: emojis = selectedEmojis.map((code) => ['emoji', code, $customEmojis.get(code) || '']);

	onMount(() => {
		getCustomEmojis();
	});
</script>

{#if $customEmojis}
	<div class="dropdown dropdown-end">
		<button tabindex="-1" class="m-1 btn btn-primary">{$_('emoji.emoji')}</button>
		<div tabindex="-1" class="w-max h-40 dropdown-content bg-base-100 overflow-auto p-2">
			{#each [...$customEmojis.entries()] as [code, url] (code)}
				<div class="w-full form-control">
					<label class="input-group">
						<span class="w-full">
							<img src={url} alt={code} class="w-4 h-4" />
							{code}
						</span>
						<input
							type="checkbox"
							class="checkbox checkbox-accent"
							value={code}
							bind:group={selectedEmojis}
						/>
					</label>
				</div>
			{/each}
		</div>
	</div>
{/if}
