import { z } from 'zod/v4'

export const MetaDataExtraFields = z.object({
  display_name: z.string(),
  website: z.union([z.literal(''), z.url()]),
  banner: z.union([z.literal(''), z.url()]),
  bot: z.boolean(),
  birtday: z.object({
    year: z.number(),
    month: z.number(),
    day: z.number(),
  }),
  /**
   * @deprecated use `display_name` instead
   */
  displayName: z.string(),
  /**
   * @deprecated use `name` instead
   */
  username: z.string(),
}).partial()
