import Profile from '@/components/Profile'
import { metadataQuery } from '@/lib/nostr/metadata'
import { createPubkey } from '@/lib/nostr/pubkey'
import { setTitle } from '@/lib/set-title'

export const Route = createFileRoute({
  component: RouteComponent,
  loader: async ({ params: { id }, context: { queryClient, pool, relays } }) => {
    const pubkey = createPubkey(id)

    return queryClient.fetchQuery(metadataQuery(pubkey, { pool, relays }))
  },
  head(context) {
    return {
      meta: [
        setTitle(context.loaderData?.content.name),
      ],
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
