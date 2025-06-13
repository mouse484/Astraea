import { Outlet } from '@tanstack/react-router'
import { z } from 'zod/v4'

const RelaysSchema = z.array(z.url({ protocol: /^wss?$/ }))

export const Route = createFileRoute({
  component: RouteComponent,
  beforeLoad: () => {
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
