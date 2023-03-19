import { subscribeEvents, type Subscribe } from '$lib/utils/nostr';
import { Store } from './mod';
import { reactions } from './reactions';

export const notes = new Store();

let sub: Subscribe | undefined = undefined;
let notNew = false;
notes.subscribe((n) => {
	if (notNew) return;
	const ids = [...n.keys()];
	if (!ids.length) return;
	sub?.unsub();
	sub = subscribeEvents(7, {
		'#e': ids,
		limit: 300
	});
	setTimeout(() => {
		notNew = false;
	}, 5 * 1000);
	notNew = true;
	sub.on('event', (event) => {
		reactions.set(event);
	});
});
