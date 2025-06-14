import { Schema } from 'effect'
import { PubkeySchema, RelayUrlSchema } from '../nostr/schemas/common'

export type StoreKey = keyof typeof StoreSchemas
export type StoreValue<K extends StoreKey> = typeof StoreSchemas[K]['Type']

export const StoreSchemas = {
  pubkey: PubkeySchema,
  relays: Schema.mutable(
    Schema.Array(
      Schema.Struct({
        url: RelayUrlSchema,
        read: Schema.Boolean,
        write: Schema.Boolean,
      }),
    ),
  ),
}
