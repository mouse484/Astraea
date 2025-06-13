import { deleteSetting } from '@/lib/setting/storage'
import { Button } from '@/shadcn-ui/components/ui/button'

export const Route = createFileRoute({
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <div>
      <Button onClick={() => {
        deleteSetting('pubkey')
      }}
      >
        Log out
      </Button>
    </div>
  )
}
