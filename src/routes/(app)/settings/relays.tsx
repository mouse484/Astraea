import type { StoreValue } from '@/lib/store/schema'
import { CloudDownload, CloudUpload } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'
import { RelayForm } from '@/components/page/settings/relay/RelayForm'
import { RelayTable } from '@/components/page/settings/relay/RelayTable'
import { readStore, writeStore } from '@/lib/store'
import { Button } from '@/shadcn-ui/components/ui/button'

export const Route = createFileRoute({
  component: RouteComponent,
})

function RouteComponent() {
  const [relays, setRelays] = useState<StoreValue<'relays'>>(() => {
    return readStore('relays') ?? []
  })
  const isInitialized = useRef(false)

  useEffect(() => {
    if (!isInitialized.current) {
      isInitialized.current = true
      return
    }
    writeStore('relays', relays)
  }, [relays])

  function handleAddRelay(url: string) {
    setRelays((relays) => {
      return [...relays, { url, read: true, write: true }]
    })
  }

  function handleUpdateRelay(index: number, relay: StoreValue<'relays'>[number]) {
    setRelays((relays) => {
      const newRelays = [...relays]
      newRelays[index] = relay
      return newRelays
    })
  }

  function handleDeleteRelay(index: number) {
    setRelays((relays) => {
      const newRelays = [...relays]
      newRelays.splice(index, 1)
      return newRelays
    })
  }

  return (
    <>
      <RelayForm onAddRelay={handleAddRelay} />

      {relays.length > 0 && (
        <RelayTable
          relays={relays}
          onUpdateRelay={handleUpdateRelay}
          onDeleteRelay={handleDeleteRelay}
        />
      )}

      <div className="mt-4 flex justify-end gap-4">
        <Button>
          <CloudDownload />
          Load Relays
        </Button>
        <Button>
          <CloudUpload />
          Save Relays
        </Button>
      </div>
    </>
  )
}
