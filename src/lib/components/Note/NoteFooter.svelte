<script lang="ts">
	import Icon from '@iconify/svelte';
	import PublishPost from '../PublishPost.svelte';

	export let eventID: string;

	let isReplayOpen = false;
</script>

<div>
	<button
		on:click={() => {
			isReplayOpen = !isReplayOpen;
		}}
	>
		<Icon icon="mdi:message-outline" />
	</button>
	{#if isReplayOpen}
		<PublishPost replyFor={eventID} />
	{/if}
</div>
