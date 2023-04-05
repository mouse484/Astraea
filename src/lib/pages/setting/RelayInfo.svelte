<script lang="ts">
	import Button from '$lib/components/elements/form/Button.svelte';

	export let relayUrl: string;

	let isOpen = false;

	type relayInfo = {
		name: string;
		description: string;
		pubkey: string;
		contact: string;
		supported_nips: string;
		software: string;
		version: string;
		[key: string]: string | Object[];
	};

	const getInfo = async () => {
		const response = await fetch(relayUrl.replace('wss://', 'https://'), {
			headers: { Accept: 'application/nostr+json' }
		}).catch(console.warn);

		return (await response?.json()) as relayInfo;
	};
</script>

<div class="relative">
	<Button on:click={() => (isOpen = !isOpen)}>Info</Button>
	{#if isOpen}
		{#await getInfo() then info}
			{#if info}
				<table class="absolute z-30 p-4 m-4 bg-white rounded border">
					<tbody>
						{#each Object.entries(info) as [key, value]}
							<tr>
								<th class="text-left">{key}</th>
								<td class="ml-2">
									{typeof value === 'object' ? JSON.stringify(value) : value}
								</td>
							</tr>
						{/each}
					</tbody>
				</table>
			{/if}
		{/await}
	{/if}
</div>
