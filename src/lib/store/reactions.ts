import type { Event } from 'nostr-tools';
import { writable } from 'svelte/store';

class ReactionsStore {
	private store = writable(new Map<string, { events: Map<string, Event>; lastUpdate: number }>());
	set(event: Event) {
		this.store.update((v) => {
			const [, id] = event.tags.find(([type]) => type === 'e') || [];
			const current = v.get(id);
			return v.set(id, {
				events: (current?.events ? current.events : new Map()).set(event.id, event),
				lastUpdate: current?.lastUpdate
					? current.lastUpdate < event.created_at
						? event.created_at
						: current?.lastUpdate
					: event.created_at
			});
		});
	}
	subscribe = this.store.subscribe;
}

export const reactions = new ReactionsStore();
