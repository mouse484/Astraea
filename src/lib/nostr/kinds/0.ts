import { kinds } from 'nostr-tools'
import { z } from 'zod/v4'
import { NostrEventSchema, UserMetaData } from '../nips/01'
import { MetaDataWithKind05Schema } from '../nips/05'
import { MetaDataExtraFields } from '../nips/24'
import { createQuery } from '../query-helpers'

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

export const metadataQuery = createQuery({
  name: 'User Metadata',
  schema: MetadataEventSchema,
  kind: kinds.Metadata,
})

export type MetadataEvent = z.infer<typeof MetadataEventSchema>
