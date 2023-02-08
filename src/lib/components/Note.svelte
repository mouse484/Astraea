<script lang="ts">
	import type { Event as relaypoolEvent } from 'nostr-relaypool/event';
	export let note: relaypoolEvent;
</script>

<div>
	<p>{note.content}</p>
	<div>{new Date(note.created_at * 1000).toLocaleString()}</div>
</div>
