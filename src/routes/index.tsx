import { Button } from '@/shadcn-ui/components/ui/button'

export const Route = createFileRoute({
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <Button>Hello Astraea</Button>
  )
}
