import type { NPub } from 'nostr-tools/nip19'
import { nip19, SimplePool } from 'nostr-tools'
import Profile from '@/components/Profile'
import { MetaDataSchema } from '@/lib/nostr/metadata'

export const Route = createFileRoute({
  component: RouteComponent,
  loader: async ({ params: { id } }) => {
    const pubkey = `npub1${id}` satisfies NPub
    const hex = nip19.decode(pubkey).data

    const pool = new SimplePool()
    const event = await pool.get(['wss://relay.damus.io', 'wss://relay.primal.net'], {
      kinds: [0],
      authors: [hex],
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
