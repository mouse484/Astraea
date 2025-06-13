import { Outlet, redirect } from '@tanstack/react-router'
import { nip19 } from 'nostr-tools'
import { z } from 'zod/v4'
import Sidebar, { SidebarProvider } from '@/components/layout/Sidebar'
import { readSetting } from '@/lib/setting/storage'

const RelaysSchema = z.array(z.url({ protocol: /^wss?$/ }))

export const Route = createFileRoute({
  component: RouteComponent,
  beforeLoad: () => {
    const pubkey = readSetting('pubkey')
    if (!pubkey) {
      throw redirect({
        to: '/',
      })
    }

    const npub = nip19.npubEncode(pubkey)

    // TODO: リレーもsettingから取得するようにする
    const relays = localStorage.getItem('relays')
    const parsedRelays = relays ? RelaysSchema.parse(JSON.parse(relays)) : ['wss://relay.damus.io']
    return {
      npub,
      relays: parsedRelays,
    }
  },
})

function RouteComponent() {
  const { npub } = Route.useRouteContext()
  return (
    <SidebarProvider>
      <Sidebar npub={npub} />
      <main className="w-full p-4">
        <Outlet />
      </main>
    </SidebarProvider>
  )
}
