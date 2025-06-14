import type { Pubkey } from '@/lib/nostr/pubkey'
import { Link, type LinkProps } from '@tanstack/react-router'
import { Home, type LucideIcon, User } from 'lucide-react'
import {
  Sidebar as ShadcnSidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from '@/shadcn-ui/components/ui/sidebar'

export { SidebarProvider } from '@/shadcn-ui/components/ui/sidebar'

interface Props {
  pubkey: Pubkey
}

export default function Sidebar({ pubkey }: Props) {
  const menuItems = [
    {
      name: 'Home',
      to: '/home',
      icon: Home,
    },
  ] satisfies {
    name: string
    to: LinkProps['to']
    icon: LucideIcon
  }[]

  return (
    <ShadcnSidebar>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            Astraea
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <SidebarMenu>
          {menuItems.map(item => (
            <SidebarMenuItem key={item.name}>
              <SidebarMenuButton asChild>
                <Link to={item.to}>
                  <item.icon />
                  {item.name}
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarContent>
      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton asChild>
              <Link to="/npub1{$id}" params={{ id: pubkey.routeId }}>
                <User />
                Profile
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </ShadcnSidebar>
  )
}
