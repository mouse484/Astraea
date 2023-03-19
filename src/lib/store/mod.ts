import type { Event } from 'nostr-tools';
import { get, writable } from 'svelte/store';

export class Store {
	private store = writable(new Map<string, Event>());
	private eventsFunc = new Map<string, ((event: Event) => void)[]>();
	constructor(private id: 'id' | 'pubkey' = 'id') {}
	set(event: Event, id?: string) {
		const useId = id || event[this.id];
		this.emit(useId, event);
		this.store.update((s) => s.set(useId, event));
	}
	get(id: string) {
		return get(this.store).get(id);
	}
	filter(key: keyof Event, has: unknown[]) {
		return [...get(this.store).values()].filter((event) =>
			has.includes(event[key])
		);
	}
	list() {
		return [...get(this.store).values()];
	}
	private emit(id: string, event: Event) {
		this.eventsFunc.get(id)?.forEach((f) => f(event));
	}
	on(id: string, callback: (event: Event) => void) {
		this.eventsFunc.set(id, [...(this.eventsFunc.get(id) || []), callback]);
	}
	subscribe = this.store.subscribe;
}
