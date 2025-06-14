import { Schema } from 'effect'

export type StoreKey = keyof typeof StoreSchemas
export type StoreValue<K extends StoreKey> = typeof StoreSchemas[K]['Type']

export const StoreSchemas = {
  pubkey: Schema.String.pipe(Schema.pattern(/^[0-9a-f]{64}$/i)),
  relays: Schema.Array(
    Schema.Struct({
      // TODO: common schemaに移す
      url: Schema.String.pipe(Schema.pattern(/^wss?:\/\//)),
      read: Schema.Boolean,
      write: Schema.Boolean,
    }),
  ),
}
