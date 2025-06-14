import type { MetadataEvent } from '@/lib/nostr/kinds/0'
import { Avatar, AvatarFallback, AvatarImage } from '@/shadcn-ui/components/ui/avatar'
import { Button } from '@/shadcn-ui/components/ui/button'

interface Props {
  content?: MetadataEvent['content']
}

export default function Profile({ content }: Props) {
  const displayName = content?.display_name || content?.name || ''
  const name = content?.nip05?.replace('_@', '') || content?.name || ''

  return (
    <div>
      <div className="bg-muted-foreground z-0 h-60">
        {content?.banner && (
          <img
            src={content.banner}
            alt="Banner"
            className="h-full w-full object-cover"
            loading="lazy"
            decoding="async"
          />
        )}
      </div>
      <Avatar className="m-2 -mt-15 size-30">
        <AvatarImage
          src={content?.picture}
          loading="lazy"
          decoding="async"
        />
        <AvatarFallback>
          {displayName.slice(0, 2).toUpperCase()}
        </AvatarFallback>
      </Avatar>
      <div className="p-4">
        <div className="flex justify-between">
          <div>
            <div className="text-2xl">{displayName}</div>
            <div className="text-muted-foreground">
              {name}
            </div>
          </div>
          <Button disabled>Follow</Button>
        </div>
        <div>
          <p>{content?.about}</p>
        </div>
      </div>
    </div>
  )
}
