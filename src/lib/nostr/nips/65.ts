import { z } from 'zod/v4'
import { RelayUrlSchema } from '../schemas/common'

export const RelayListSchema = z.array(
  z.tuple([
    z.literal('r'),
    RelayUrlSchema,
    z.union([
      z.literal('read'),
      z.literal('write'),
    ]).optional(),
  ]),
)

export type RelayList = z.infer<typeof RelayListSchema>
