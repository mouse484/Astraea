import { Schema } from 'effect'
import { kinds } from 'nostr-tools'
import { NostrEventSchema } from '../nips/01'
import { RelayListSchema } from '../nips/65'
import { createQuery } from '../query-helpers'

const RelayListMetadataSchema = Schema.Struct({
  ...NostrEventSchema.fields,
  kind: Schema.Literal(kinds.RelayList),
  tags: RelayListSchema,
  content: Schema.optional(Schema.Literal('')),
})

export const relayListQuery = createQuery({
  name: 'Relay List',
  schema: RelayListMetadataSchema,
  kind: kinds.RelayList,
})
