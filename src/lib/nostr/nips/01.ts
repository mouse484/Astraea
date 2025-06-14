import { fromUnixTime } from 'date-fns'
import { z } from 'zod/v4'
import {
  Hex32BytesSchema,
  Hex64BytesSchema,
  KindIntegerSchema,
  PubkeySchema,
  RelayUrlSchema,
} from '../schemas/common'

const TagSchema = z.union([
  z.tuple([z.literal('e'), PubkeySchema, RelayUrlSchema.optional(), PubkeySchema.optional()]),
  z.tuple([z.literal('p'), PubkeySchema, RelayUrlSchema.optional()]),
  z.tuple([
    z.literal('a'),
    z.templateLiteral([
      KindIntegerSchema,
      ':',
      PubkeySchema,
      ':',
      z.string()
        .meta({
          description: 'tag',
        })
        .optional(),
    ]),
    RelayUrlSchema.optional(),
  ]),
])

const TagsSchema = z.array(TagSchema)

export const NostrEventSchema = z.object({
  id: Hex32BytesSchema,
  pubkey: PubkeySchema,
  created_at: z.number().int().nonnegative().transform(timestamp => fromUnixTime(timestamp)),
  kind: KindIntegerSchema,
  tags: TagsSchema,
  content: z.string(),
  sig: Hex64BytesSchema,
})

export const UserMetaData = z.object({
  name: z.string(),
  about: z.string(),
  picture: z.union([z.literal(''), z.url()]),
}).partial()
