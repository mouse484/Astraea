import { z } from 'zod/v4'

export const MetaDataWithKind05Schema = z.object({
  /** email like identifier */
  nip05: z.union([z.literal(''), z.email()]),
})
