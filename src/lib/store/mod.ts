import type { Event } from 'nostr-tools';
import { get, writable } from 'svelte/store';

export class Store {
	private store = writable(new Map<string, Event>());
	set(event: Event) {
		this.store.update((s) => s.set(event.id, event));
	}
	get(id: string) {
		return get(this.store).get(id);
	}
	filter(key: keyof Event, has: unknown[]) {
		return [...get(this.store).values()].filter((event) =>
			has.includes(event[key])
		);
	}
	subscribe = this.store.subscribe;
}
