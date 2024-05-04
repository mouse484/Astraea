import type { NDKEvent } from '@nostr-dev-kit/ndk';

type NoteID = string;
type ReactionKey = string; // emoji or custom key
type reactionID = string;
type NoteReactions = Map<ReactionKey, ReactionEvents>;
export type ReactionEvents = Map<reactionID, NDKEvent>;

export type SubscribeCallback = (reactions: NoteReactions) => unknown;

class ReactionsStore {
	subscribes = new Map<NoteID, SubscribeCallback>();
	store = $state(new Map<NoteID, NoteReactions>());

	addReaction(event: NDKEvent) {
		const [, noteID] = event.tags.find(([type]) => type === 'e') || [];

		const noteReactions: NoteReactions = this.store.get(noteID) || new Map();

		const reactionKey = event.content;
		const events: ReactionEvents = noteReactions.get(reactionKey) || new Map();
		events.set(event.id, event);

		noteReactions.set(reactionKey, events);
		this.store.set(noteID, noteReactions);

		this.subscribes.get(noteID)?.(noteReactions);
	}

	get reactions() {
		return this.store;
	}

	subscribe(noteID: NoteID, callback: SubscribeCallback) {
		this.subscribes.set(noteID, callback);
		return this.store.get(noteID);
	}
	unsubscribe(noteID: NoteID) {
		this.subscribes.delete(noteID);
	}
}

export const reactions = new ReactionsStore();
