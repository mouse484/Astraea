<script lang="ts">
	import { tableContent } from './info.css';

	let url: string;

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
		if (!url) return;
		const response = await fetch(url.replace('wss://', 'https://'), {
			headers: { Accept: 'application/nostr+json' }
		}).catch(console.warn);

		return (await response?.json()) as relayInfo;
	};
</script>

<div>
	<h3>relay info</h3>

	<input
		type="text"
		bind:value={url}
		placeholder="wss:// or https:// relay url"
	/>
</div>

{#key url}
	{#await getInfo()}
		<div>loading</div>
	{:then info}
		{#if info}
			<table>
				<tbody>
					{#each Object.entries(info) as [key, value]}
						<tr>
							<th>{key}</th>
							<td class={tableContent}>
								{typeof value === 'object' ? JSON.stringify(value) : value}
							</td>
						</tr>
					{/each}
				</tbody>
			</table>
		{/if}
	{:catch _}
		<div>正しいリレーリンクを入れてください</div>
	{/await}
{/key}
