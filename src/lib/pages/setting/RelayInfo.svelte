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

<div>
	<label for="info" class="btn btn-info">Info</label>
	<input type="checkbox" id="info" class="modal-toggle" />
	{#await getInfo() then info}
		{#if info}
			<label for="info" class="modal">
				<table class="modal-box">
					{#each Object.entries(info) as [key, value]}
						<tr>
							<th class="text-left">{key}</th>
							<th class="ml-2">
								{typeof value === 'object' ? JSON.stringify(value) : value}
							</th>
						</tr>
					{/each}
				</table>
			</label>
		{/if}
	{/await}
</div>
