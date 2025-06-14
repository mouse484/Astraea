import { fromUnixTime } from 'date-fns'
import { z } from 'zod/v4'

const HexSchema = z.string().regex(/^[0-9a-f]+$/).lowercase()
const Hex32BytesSchema = HexSchema.length(64)
const Hex64BytesSchema = HexSchema.length(128)

const KindIntegerSchema = z.number().int().min(0).max(65_535)
const PubkeySchema = Hex32BytesSchema
const RelayUrlSchema = z.url({ protocol: /^wss?$/ })

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

export type NostrEvent = z.infer<typeof NostrEventSchema>

export const UserMetaData = z.object({
  name: z.string(),
  about: z.string(),
  picture: z.union([z.literal(''), z.url()]),
}).partial()
