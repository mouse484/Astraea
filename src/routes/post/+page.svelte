<script lang="ts">
	import { goto } from '$app/navigation';
	import NoteForm from '$lib/components/Note/NoteForm/NoteForm.svelte';
</script>

<NoteForm
	on:status={(event) => {
		if (event.detail === 'success') {
			goto('/');
		}
	}}
/>
