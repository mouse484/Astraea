import type { Filter, Event } from 'nostr-tools';
import { get, writable } from 'svelte/store';
import { subscribeEvents } from './nostr';

export class Store {
	store = writable(new Map<string, Event>());
	waitList = new Set<string>();
	constructor(private kind: number, private require: 'authors') {}
	get(id: string) {
		const current = get(this.store).get(id);
		if (current) return current;
		if (this.waitList.has(id)) return;

		const filter: Filter = { kinds: [this.kind], limit: 1 };
		filter[this.require] = [id];

		const sub = subscribeEvents(filter);

		this.waitList.add(id);

		sub.on('event', (event: Event) => {
			this.waitList.delete(id);
			sub.unsub();
			this.store.update((s) => s.set(id, event));
		});
		sub.on('eose', () => {
			this.waitList.delete(id);
			sub.unsub();
		});
	}
}
