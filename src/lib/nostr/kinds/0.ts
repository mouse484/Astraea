import type { SimplePool } from 'nostr-tools'
import type { Pubkey } from '../pubkey'
import { queryOptions } from '@tanstack/react-query'
import { kinds } from 'nostr-tools'
import z from 'zod/v4'
import { NostrEventSchema, UserMetaData } from '../nips/01'
import { MetaDataWithKind05Schema } from '../nips/05'
import { MetaDataExtraFields } from '../nips/24'

const MetadataSchema = z.object({
  ...UserMetaData.shape,
  ...MetaDataWithKind05Schema.shape,
  ...MetaDataExtraFields.shape,
}).loose().partial()

export const MetadataEventSchema = NostrEventSchema.extend({
  kind: z.literal(kinds.Metadata),
  content: z.string().transform((value, context) => {
    try {
      const parsed = JSON.parse(value)
      return MetadataSchema.parse(parsed)
    } catch {
      context.addIssue({
        message: 'Invalid JSON format for user metadata',
      })
      return z.NEVER
    }
  }),
})

export function metadataQuery(
  pubkey: Pubkey,
  { pool, relays }: { pool: SimplePool, relays: string[] },
) {
  const hex = pubkey.hex
  return queryOptions({
    queryKey: ['metadata', hex],
    queryFn: async () => {
      const event = await pool.get(relays, {
        kinds: [kinds.Metadata],
        authors: [hex],
      })
      if (!event) {
        throw new Error(`Metadata not found for pubkey: ${pubkey.npub}`)
      }
      const parsed = MetadataEventSchema.parse(event)
      return parsed
    },
  })
}
