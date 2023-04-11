import { getEventHash, type Event, type Filter, type UnsignedEvent, SimplePool } from 'nostr-tools';

const pool = new SimplePool();

export const subscribeEvents = (
	kind: number,
	filter: Filter,
	relays: string[],
	options?: { eoseUnsub?: boolean }
) => {
	const sub = pool.sub(relays, [{ kinds: [kind], ...filter }]);
	if (options?.eoseUnsub) {
		sub.on('eose', () => {
			sub.unsub();
		});
	}
	return sub;
};

export const getEvent = (kind: number, filter: Filter, relays: string[]) => {
	return new Promise<Event>((resolve) => {
		const sub = pool.sub(relays, [{ kinds: [kind], limit: 1, ...filter }]);
		sub.on('event', (event: Event) => {
			resolve(event);
			sub.unsub();
		});
	});
};

export const publishEvent = async (unsignedEvent: UnsignedEvent, relays: string[]) => {
	if (!window.nostr) return;
	const signedEvent = await window.nostr.signEvent({
		id: getEventHash(unsignedEvent),
		...unsignedEvent
	});
	return pool.publish(relays, signedEvent);
};
