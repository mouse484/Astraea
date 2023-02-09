<script lang="ts">
	import type { Event as relayEvent } from 'nostr-tools';
	export let note: relayEvent;
</script>

<div>
	<p>{note.content}</p>
	<div>{new Date(note.created_at * 1000).toLocaleString()}</div>
</div>
