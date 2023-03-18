import { subscribeEvents } from '$lib/utils/nostr';
import type { Filter, Event } from 'nostr-tools';
import { get, writable } from 'svelte/store';

export type ProfileData = Partial<{
	display_name: string;
	name: string;
	picture: string;
	nip05: string;
	about: string;
	banner: string;
	website: string;
	[key: string]: string;
}>;

export class Store {
	store = writable(new Map<string, Event>());
	waitList = new Set<string>();
	func = new Map<string, (event: Event) => void>();
	get(id: string) {
		const current = get(this.store).get(id);
		if (current) return current;
		if (this.waitList.has(id)) return;

		const sub = subscribeEvents({ kinds: [0], limit: 1, authors: [id] });

		this.waitList.add(id);

		sub.on('event', (event: Event) => {
			this.waitList.delete(id);
			sub.unsub();

			this.emit(event.pubkey, event);
			this.store.update((s) => s.set(id, event));
		});
		sub.on('eose', () => {
			this.waitList.delete(id);
			sub.unsub();
		});
	}
	private emit(pubkey: string, event: Event) {
		this.func.get(pubkey)?.(event);
	}
	on(pubkey: string, callback: (event: Event) => void) {
		this.func.set(pubkey, callback);
	}
}

export const profiles = new Store();
