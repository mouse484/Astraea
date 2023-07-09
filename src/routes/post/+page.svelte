<script lang="ts">
	import { goto } from '$app/navigation';
	import Main from '$lib/components/Main.svelte';
	import NoteForm from '$lib/components/Note/NoteForm/NoteForm.svelte';
	import { _ } from 'svelte-i18n';
</script>

<Main title={$_('home.post.post')}>
	<NoteForm
		on:status={(event) => {
			if (event.detail === 'success') {
				goto('/');
			}
		}}
	/>
</Main>
