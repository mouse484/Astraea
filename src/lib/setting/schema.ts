import { z } from 'zod/v4'
import { RelayUrlSchema } from '../nostr/schemas/common'

export type SettingKey = keyof typeof SettingSchemas
export type SettingValue<K extends SettingKey> = z.infer<typeof SettingSchemas[K]>

export const SettingSchemas = {
  pubkey: z.string().optional(),
  relays: z.array(
    z.object({
      url: RelayUrlSchema,
      read: z.boolean().default(true),
      write: z.boolean().default(true),
    }),
  ),
}
