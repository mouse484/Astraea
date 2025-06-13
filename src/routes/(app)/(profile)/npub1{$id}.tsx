import type { NPub } from 'nostr-tools/nip19'
import Profile from '@/components/Profile'
import { metadataQuery } from '@/lib/nostr/metadata'

export const Route = createFileRoute({
  component: RouteComponent,
  loader: async ({ params: { id }, context: { queryClient, pool, relays } }) => {
    const pubkey = `npub1${id}` satisfies NPub

    return queryClient.fetchQuery(metadataQuery(pubkey, { pool, relays }))
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
