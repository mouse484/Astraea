import { subscribeEvents } from '$lib/utils/nostr';
import type { Event, Sub } from 'nostr-tools';
import { writable } from 'svelte/store';

export const notesUpdater = (
	id: string,
	event: Event,
	append: 'root' | 'reply' = 'root',
	is: 'note' | 'reaction' = 'note'
) => {
	notes.update((i) => {
		const current = i.get(id);
		const eventTime = new Date(event.created_at * 1000);
		const updated = current?.updated
			? current.updated > eventTime
				? current.updated
				: eventTime
			: eventTime;

		const value = {
			...current,
			updated
		};

		switch (append) {
			case 'root': {
				const currentRoot = current?.root;
				if (is === 'note') {
					value.root = { ...currentRoot, event };
				} else if (is === 'reaction' && currentRoot) {
					value.root = {
						...currentRoot,
						reactions: new Map(currentRoot.reactions).set(event.id, {
							pubkey: event.pubkey,
							content: event.content
						})
					};
				}
				break;
			}
			case 'reply':
				value.reply = (current?.reply || new Map<string, NoteInfo>()).set(
					event.id,
					{ event }
				);
				break;
		}
		return i.set(id, value);
	});
};

export type NoteInfo = {
	event: Event;
	reactions?: Map<string, { pubkey: string; content: string }>;
};
export const notes = writable(
	new Map<
		string,
		{ updated: Date; root?: NoteInfo; reply?: Map<string, NoteInfo> }
	>()
);

export const noteWaiteList = writable(new Set<string>());

let reactSub: Sub | undefined = undefined;
let notNew = false;
notes.subscribe((n) => {
	if (notNew) return;
	reactSub?.unsub();
	reactSub = subscribeEvents({
		kinds: [1, 7],
		'#e': [...n.keys()],
		limit: 300
	});
	setTimeout(() => {
		notNew = false;
	}, 1000);
	notNew = true;
	reactSub.on('event', (event: Event) => {
		const [, id] = event.tags.find(([type]) => type === 'e') || [];
		if (!id) return;
		switch (event.kind) {
			case 1: {
				notesUpdater(id, event, 'reply');
				break;
			}
			case 7: {
				notesUpdater(id, event, 'root', 'reaction');
				break;
			}
		}
	});
});
