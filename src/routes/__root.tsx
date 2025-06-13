import type { RouterContext } from '@/main'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { createRootRouteWithContext, Link, Outlet } from '@tanstack/react-router'
import { TanStackRouterDevtools } from '@tanstack/react-router-devtools'
import { Button } from '@/shadcn-ui/components/ui/button'
import { Toaster } from '@/shadcn-ui/components/ui/sonner'
import '../index.css'

export const Route = createRootRouteWithContext<RouterContext>()({
  component: () => (
    <>
      <Outlet />
      <Toaster />
      <TanStackRouterDevtools initialIsOpen={false} />
      <ReactQueryDevtools initialIsOpen={false} />
    </>
  ),
  notFoundComponent: () => (
    <div className={`
      grid h-svh w-svw place-content-center place-items-center gap-8
    `}
    >
      <h1 className="text-4xl">404</h1>
      <Button variant="outline" asChild>
        <Link to="/">Back to Top</Link>
      </Button>
    </div>
  ),
})
