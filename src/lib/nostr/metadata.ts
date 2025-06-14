import type { Pubkey } from './pubkey'
import { queryOptions } from '@tanstack/react-query'
import { kinds, type SimplePool } from 'nostr-tools'
import { z } from 'zod/v4'
import { Nip01Kind0MetaDataSchema } from './nips/01'
import { Nip05Kind0MetaDataSchema } from './nips/05'
import { Nip24Kind0MetaDataSchema } from './nips/24'

const MetaDataContentSchema = z.object({
  ...Nip01Kind0MetaDataSchema.shape,
  ...Nip05Kind0MetaDataSchema.shape,
  ...Nip24Kind0MetaDataSchema.shape,
}).partial().loose()

export type MetaDataContent = z.infer<typeof MetaDataContentSchema>

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
      const content = MetaDataContentSchema.parse(JSON.parse(event.content))
      return {
        event,
        content,
      }
    },
  })
}
