<script lang="ts">
	import NDK, { NDKRelayStatus, type NDKRelay } from '@nostr-dev-kit/ndk';
	import Icon from '../elements/Icon.svelte';

	const { uri, relay, ndk }: { uri: string; relay: NDKRelay; ndk: NDK } = $props();
	const relayStatus = () => {
		switch (relay.status) {
			case NDKRelayStatus.CONNECTING:
			case NDKRelayStatus.RECONNECTING:
				return '#f1c40f'; // yellow
			case NDKRelayStatus.CONNECTED:
				return '#2ecc71'; // green
			case NDKRelayStatus.DISCONNECTED:
				return '#e74c3c'; // red
			default:
				return '#FFF';
		}
	};
	const remove = () => {
		ndk.pool.removeRelay(uri);
	};
</script>

<li class="flex items-center gap-2">
	<span id="status" class="block size-4 rounded-lg" style="--status-color: {relayStatus()}"></span>
	<h3>{uri}</h3>
	<button class="bg-transparent" onclick={remove}>
		<Icon name="close" size="1" />
	</button>
</li>

<style>
	#status {
		background-color: var(--status-color);
	}
</style>
