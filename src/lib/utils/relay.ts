import { SimplePool, type Event, type Filter } from 'nostr-tools';

const defaultRelays = [
	'wss://relay.damus.io',
	'wss://relay.snort.social',
	'wss://eden.nostr.land'
];

// relay取得する仕組みあとで

class RelayEventer<T extends unknown[]> {
	private event!: (...args: T) => void;
	on(callback: (...args: T) => void) {
		this.event = callback;
	}
	emit(...args: T) {
		this.event?.(...args);
	}
}

class RelayPool {
	pool: SimplePool;
	relays: string[] = defaultRelays;
	constructor() {
		this.pool = new SimplePool();
	}
	subscribe(kind: number, filter: Filter = {}) {
		const subEE = new RelayEventer<[Event]>();
		const subs = this.pool.sub(this.relays, [{ kinds: [kind], ...filter }]);

		subs.on('event', (event: Event) => {
			subEE.emit(event);
		});
		subs.on('eose', () => subs.unsub());

		return subEE;
	}
	async get(kind: number, filter: Filter = {}) {
		return await this.pool.get(this.relays, { kinds: [kind], ...filter });
	}
}

export const relayPool = new RelayPool();
