import { kinds } from 'nostr-tools'
import { z } from 'zod/v4'
import { NostrEventSchema } from '../nips/01'
import { RelayListSchema } from '../nips/65'
import { createQuery } from '../query-helpers'

export const RelayListMetadataSchema = NostrEventSchema.extend({
  kind: z.literal(kinds.RelayList),
  tags: RelayListSchema,
  content: z.literal('').optional(),
})

export const relayListQuery = createQuery({
  name: 'Relay List',
  schema: RelayListMetadataSchema,
  kind: kinds.RelayList,
})

export type RelayListMetadataEvent = z.infer<typeof RelayListMetadataSchema>
