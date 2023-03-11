import type { Event } from 'nostr-tools';
import { writable } from 'svelte/store';

export const notes = writable(new Map<string, Event>());
