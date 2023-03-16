import type { Event } from 'nostr-tools';
import { writable } from 'svelte/store';

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
				value.root = { event };
				break;
			case 'reply':
				value.reply = (current?.reply || new Map()).set(event.id, { event });
				break;
		}
		return i.set(id, value);
	});
};

export type NoteInfo = { event: Event; reactions?: string[] };
export const notes = writable(
	new Map<
		string,
		{ updated: Date; root?: NoteInfo; reply?: Map<string, NoteInfo> }
	>()
);

export const noteWaiteList = writable(new Set<string>());
