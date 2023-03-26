<script lang="ts">
	import NoteWithId from '$lib/components/Note/NoteWithId.svelte';
	import TimeLine from '$lib/components/TimeLine.svelte';
	import type { PageData } from './$types';

	export let data: PageData;
</script>

<div>
	<TimeLine filter={{ ids: [data.id] }} newOnly={true} />
</div>
