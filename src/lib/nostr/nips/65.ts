import { Schema } from 'effect'
import { RelayUrlSchema } from '../schemas/common'

export const RelayListSchema = Schema.Array(
  Schema.Tuple(
    Schema.Literal('r'),
    RelayUrlSchema,
    Schema.optionalElement(
      Schema.Union(
        Schema.Literal('read'),
        Schema.Literal('write'),
      ),
    ),
  ),
)
