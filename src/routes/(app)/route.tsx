import { Outlet, redirect } from '@tanstack/react-router'
import { z } from 'zod/v4'
import Sidebar, { SidebarProvider } from '@/components/layout/Sidebar'
import { createPubkey } from '@/lib/nostr/pubkey'
import { readSetting } from '@/lib/setting/storage'

const RelaysSchema = z.array(z.url({ protocol: /^wss?$/ }))

export const Route = createFileRoute({
  component: RouteComponent,
  beforeLoad: () => {
    const pubkeyHex = readSetting('pubkey')
    if (!pubkeyHex) {
      throw redirect({
        to: '/',
      })
    }

    const pubkey = createPubkey(pubkeyHex)

    // TODO: リレーもsettingから取得するようにする
    const relays = localStorage.getItem('relays')
    const parsedRelays = relays ? RelaysSchema.parse(JSON.parse(relays)) : ['wss://relay.damus.io', 'wss://relay.nostr.band', 'wss://nostr-pub.wellorder.net']
    return {
      pubkey,
      relays: parsedRelays,
    }
  },
})

function RouteComponent() {
  const { pubkey } = Route.useRouteContext()
  return (
    <SidebarProvider>
      <Sidebar pubkey={pubkey} />
      <main className="w-full p-4">
        <Outlet />
      </main>
    </SidebarProvider>
  )
}
