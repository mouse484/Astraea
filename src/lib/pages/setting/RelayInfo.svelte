<script lang="ts">
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
	<button on:click={() => (isOpen = !isOpen)} class="btn">Info</button>
	{#if isOpen}
		{#await getInfo() then info}
			{#if info}
				<table class="absolute z-30 p-4 m-4 rounded border bg-base-100">
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
