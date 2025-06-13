import { Outlet, redirect } from '@tanstack/react-router'
import { z } from 'zod/v4'
import { readSetting } from '@/lib/setting/storage'

const RelaysSchema = z.array(z.url({ protocol: /^wss?$/ }))

export const Route = createFileRoute({
  component: RouteComponent,
  beforeLoad: () => {
    if (!readSetting('auth')) {
      throw redirect({
        to: '/',
      })
    }

    const relays = localStorage.getItem('relays')
    const parsedRelays = relays ? RelaysSchema.parse(JSON.parse(relays)) : ['wss://relay.damus.io']
    return {
      relays: parsedRelays,
    }
  },
})

function RouteComponent() {
  return <Outlet />
}
