import { z } from 'zod/v4'

export const Nip01Kind0MetaDataSchema = z.object({
  name: z.string(),
  about: z.string(),
  picture: z.union([z.literal(''), z.url()]),
}).partial()
