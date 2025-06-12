import z from 'zod/v4'

export const Nip05Kind0MetaDataSchema = z.object({
  /** email like identifier */
  nip05: z.union([z.literal(''), z.email()]),
})
