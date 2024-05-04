import { boolean, object, record, string } from 'valibot';

export const contactsRelayScheme = record(string(), object({ read: boolean(), write: boolean() }));
