<script lang="ts">
	import { notes } from '$lib/store/notes';
	import { profiles } from '$lib/store/profiles';
	import { subscribeEvents, type Subscribe } from '$lib/utils/nostr';
	import type { Event } from 'nostr-tools';
	import { onDestroy, onMount } from 'svelte';
	import Note from './Note/Note.svelte';

	export let authors: string[];

	let useNotes: Event[];

	const unsubscribe = notes.subscribe(() => {
		useNotes = notes
			.filter('pubkey', authors)
			.sort((a, b) => b.created_at - a.created_at);
	});

	let profileSub: Subscribe | undefined;

	const getProfile = () => {
		const hasNotProfile = [
			...new Set(
				useNotes.flatMap((note) =>
					profiles.get(note.pubkey) ? [] : note.pubkey
				)
			)
		];
		if (hasNotProfile.length) {
			profileSub = subscribeEvents(0, { authors: hasNotProfile }, 'eose');
			profileSub.on('event', (event) => {
				profiles.set(event);
			});
		}
	};

	const interval = setInterval(() => {
		getProfile();
	}, 5 * 1000);

	onMount(() => {
		const sub = subscribeEvents(1, { limit: 30, authors });
		sub.on('event', (event) => {
			notes.set(event);
		});
	});

	onDestroy(() => {
		profileSub?.unsub();
		unsubscribe();
		clearInterval(interval);
		useNotes = [];
	});
</script>

{#each useNotes as event (event.id)}
	<Note {event} />
{/each}
