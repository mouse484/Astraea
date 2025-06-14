import { fromUnixTime, getUnixTime } from 'date-fns'
import { Schema } from 'effect'
import {
  Hex32BytesSchema,
  Hex64BytesSchema,
  KindIntegerSchema,
  PubkeySchema,
  RelayUrlSchema,
  URLSchema,
} from '../schemas/common'

export const TagSchema = Schema.Union(
  Schema.Tuple(
    Schema.Literal('e'),
    PubkeySchema,
    Schema.optionalElement(RelayUrlSchema),
    Schema.optionalElement(PubkeySchema),
  ),
  Schema.Tuple(
    Schema.Literal('p'),
    PubkeySchema,
    Schema.optionalElement(RelayUrlSchema),
  ),
  Schema.Tuple(
    Schema.Literal('a'),
    Schema.optionalElement(
      Schema.TemplateLiteralParser(
        KindIntegerSchema,
        ':',
        PubkeySchema,
        ':',
        Schema.String,
      ),
    ),
    Schema.optionalElement(RelayUrlSchema),
  ),
)

const TagsSchema = Schema.Array(TagSchema)

export const NostrEventSchema = Schema.Struct({
  id: Hex32BytesSchema,
  pubkey: PubkeySchema,
  created_at: Schema.transform(
    Schema.Int,
    Schema.DateFromSelf,
    {
      strict: true,
      decode: timestamp => fromUnixTime(timestamp),
      encode: date => getUnixTime(date),
    },
  ),
  kind: KindIntegerSchema,
  tags: TagsSchema,
  content: Schema.String,
  sig: Hex64BytesSchema,
})

export const UserMetadataSchema = Schema.Struct({
  name: Schema.String,
  about: Schema.String,
  picture: URLSchema,
})
