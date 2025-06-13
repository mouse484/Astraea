import type { NPub } from 'nostr-tools/nip19'
import { queryOptions } from '@tanstack/react-query'
import { kinds, nip19, type SimplePool } from 'nostr-tools'
import { z } from 'zod/v4'
import { Nip01Kind0MetaDataSchema } from './nips/01'
import { Nip05Kind0MetaDataSchema } from './nips/05'
import { Nip24Kind0MetaDataSchema } from './nips/24'

const MetaDataSchema = z.object({
  ...Nip01Kind0MetaDataSchema.shape,
  ...Nip05Kind0MetaDataSchema.shape,
  ...Nip24Kind0MetaDataSchema.shape,
}).partial().loose()

export function metadataQuery(
  pubkey: NPub,
  { pool, relays }: { pool: SimplePool, relays: string[] },
) {
  const hex = nip19.decode(pubkey).data
  return queryOptions({
    queryKey: ['metadata', hex],
    queryFn: async () => {
      const event = await pool.get(relays, {
        kinds: [kinds.Metadata],
        authors: [hex],
      })
      if (!event) {
        throw new Error(`Metadata not found for pubkey: ${pubkey}`)
      }
      const content = MetaDataSchema.parse(JSON.parse(event.content))
      return {
        event,
        content,
      }
    },
  })
}
