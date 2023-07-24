<script lang="ts">
	import { onMount } from 'svelte';

	import { nip19 } from 'nostr-tools';
	import type { HastNode } from 'svelte-exmarkdown/types';

	import Mention from './Mention.svelte';
	import Note from '../Note.svelte';

	export let type: unknown;
	export let tagName: unknown;
	export let __index: unknown;
	export let children: HastNode[];
	[type, tagName, __index, children];

	export let properties: { id: string };

	let value: nip19.DecodeResult;

	onMount(() => {
		if (!properties.id) return;
		try {
			value = nip19.decode(properties.id);
		} catch (err) {
			console.error(err);
		}
	});
</script>

{#if value}
	{#if value.type === 'note'}
		<Note id={value.data} />
	{:else if value.type === 'nevent'}
		<Note id={value.data.id} />
	{:else if value.type === 'npub'}
		<Mention pubkey={value.data} />
	{:else}
		<p class="text-pink-300">{value.type}:{value.data}</p>
	{/if}
{/if}
