import type { Filter } from 'nostr-tools'
import type { z } from 'zod/v4'
import type { RouterContext } from '@/main'
import type { AppRouteContext } from '@/routes/(app)/route'
import { queryOptions } from '@tanstack/react-query'

export interface NostrQueryContext extends
  Pick<RouterContext, 'pool'>,
  Pick<AppRouteContext, 'relays'>,
  Record<string, unknown> {}

export interface QueryConfig<T> {
  name: string
  schema: z.ZodSchema<T>
  kind: number
}

export function createQuery<T>({ name, schema, kind }: QueryConfig<T>) {
  return ({ pool, relays }: NostrQueryContext, filter: Omit<Filter, 'kinds'>) => {
    const fullFilter = { ...filter, kinds: [kind] }

    return queryOptions({
      queryKey: [name, kind, filter],
      queryFn: async () => {
        const event = await pool.get(relays.read, fullFilter)
        if (!event) {
          throw new Error(`${name} event not found`)
        }
        return schema.parse(event)
      },
    })
  }
}
