import type { NPub } from 'nostr-tools/nip19'
import { kinds, nip19 } from 'nostr-tools'
import Profile from '@/components/Profile'
import { MetaDataSchema } from '@/lib/nostr/metadata'

export const Route = createFileRoute({
  component: RouteComponent,
  loader: async ({ params: { id }, context: { queryClient, pool, relays } }) => {
    const pubkey = `npub1${id}` satisfies NPub
    const hex = nip19.decode(pubkey).data

    const event = await queryClient.fetchQuery({
      queryKey: ['profile', hex],
      queryFn: async () => {
        return await pool.get(relays, {
          kinds: [kinds.Metadata],
          authors: [hex],
        })
      },
    })

    const result = MetaDataSchema.safeParse(JSON.parse(event?.content ?? '{}'))
    const content = result.success ? result.data : undefined

    return {
      content,
      event,
    }
  },
})

function RouteComponent() {
  const { content } = Route.useLoaderData()

  return (
    <div>
      <Profile content={content} />
    </div>
  )
}
