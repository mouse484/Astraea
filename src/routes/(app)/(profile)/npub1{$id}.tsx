import Profile from '@/components/Profile'
import { metadataQuery } from '@/lib/nostr/kinds/0'
import { createPubkey } from '@/lib/nostr/pubkey'
import { setTitle } from '@/lib/set-title'

export const Route = createFileRoute({
  component: RouteComponent,
  loader: async ({ params: { id }, context: { queryClient, ...context } }) => {
    const pubkey = createPubkey(id)

    return queryClient.fetchQuery(metadataQuery(context, {
      authors: [pubkey.hex],
    }))
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
