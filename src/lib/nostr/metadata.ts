import { z } from 'zod/v4'
import { Nip01Kind0MetaDataSchema } from '../nips/01'
import { Nip05Kind0MetaDataSchema } from '../nips/05'
import { Nip24Kind0MetaDataSchema } from '../nips/24'

export const MetaDataSchema = z.object({
  ...Nip01Kind0MetaDataSchema.shape,
  ...Nip05Kind0MetaDataSchema.shape,
  ...Nip24Kind0MetaDataSchema.shape,
}).partial().loose()
