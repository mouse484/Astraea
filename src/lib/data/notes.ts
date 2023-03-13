import { get } from '$lib/utils/nostr';
import type { Event } from 'nostr-tools';
import { writable, get as getStore } from 'svelte/store';

export const getNote = async (id: string) => {
	// eslint-disable-next-line no-async-promise-executor
	return new Promise<Event>(async (resolve, reject) => {
		const note = getStore(notes).get(id);
		if (note?.root) {
			resolve(note.root);
		} else {
			const event = await get({ kinds: [1], ids: [id] });
			if (event) {
				notesUpdater(event.id, event, 'root');
				resolve(event);
			} else {
				reject();
			}
		}
	});
};

export const notesUpdater = (
	id: string,
	event: Event,
	append: 'root' | 'reply' = 'root'
) => {
	notes.update((i) => {
		const current = i.get(event.id);
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
			case 'root':
				value.root = event;
				break;
			case 'reply':
				value.reply = (current?.reply || new Map()).set(event.id, event);
		}
		return i.set(id, value);
	});
};

export const notes = writable(
	new Map<string, { updated: Date; root?: Event; reply?: Map<string, Event> }>()
);
