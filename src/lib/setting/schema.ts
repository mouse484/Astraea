import { z } from 'zod/v4'

export const SettingSchemas = {
  pubkey: z.string().optional(),
}
