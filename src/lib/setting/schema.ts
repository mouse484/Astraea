import { z } from 'zod/v4'

export const SettingSchemas = {
  auth: z.literal('nip-07').optional(),
  // theme: z.enum(['system', 'light', 'dark']).default('system'),
}
