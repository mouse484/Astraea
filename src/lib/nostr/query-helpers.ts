import type { Filter, SimplePool } from 'nostr-tools'
import type { z } from 'zod/v4'
import { queryOptions } from '@tanstack/react-query'

export interface NostrQueryContext extends Record<string, unknown> {
  pool: SimplePool
  relays: string[]
}

export interface QueryConfig<T> {
  name: string
  schema: z.ZodSchema<T>
  kind: number
}

export function createQuery<T>({ name, schema, kind }: QueryConfig<T>) {
  return ({ pool, relays }: NostrQueryContext, filter: Omit<Filter, 'kinds'>) => {
    const fullFilter = { ...filter, kinds: [kind] }

    return queryOptions({
      queryKey: [name, fullFilter],
      queryFn: async () => {
        const event = await pool.get(relays, fullFilter)
        if (!event) {
          throw new Error(`${name} event not found`)
        }
        return schema.parse(event)
      },
    })
  }
}
