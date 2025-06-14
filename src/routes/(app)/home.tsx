import { deleteStore } from '@/lib/store'
import { Button } from '@/shadcn-ui/components/ui/button'

export const Route = createFileRoute({
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <div>
      <Button onClick={() => {
        deleteStore('pubkey')
      }}
      >
        Log out
      </Button>
    </div>
  )
}
