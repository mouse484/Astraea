import { z } from 'zod/v4'
import { RelayUrlSchema } from '../nostr/schemas/common'

export type StoreKey = keyof typeof StoreSchemas
export type StoreValue<K extends StoreKey> = z.infer<typeof StoreSchemas[K]>

export const StoreSchemas = {
  pubkey: z.string().optional(),
  relays: z.array(
    z.object({
      url: RelayUrlSchema,
      read: z.boolean().default(true),
      write: z.boolean().default(true),
    }),
  ),
}
