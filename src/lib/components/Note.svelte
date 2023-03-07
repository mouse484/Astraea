<script lang="ts">
	import type { Event } from 'nostr-tools';

	export let note: Event;
</script>

<div>
	{note.content}
</div>
