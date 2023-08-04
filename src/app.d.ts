import type { UnsignedEvent, Event } from 'nostr-tools';

// See https://kit.svelte.dev/docs/types#app
// for information about these interfaces

declare global {
	namespace App {
		// interface Error {}
		// interface Locals {}
		// interface PageData {}
		// interface Platform {}
	}
	interface Window {
		nostr?: {
			getPublicKey(): Promise<string>;
			signEvent(event: UnsignedEvent & { id: string }): Promise<Event>;
		};
	}
}

export {};
