import type { SettingValue } from '@/lib/setting/schema'
import { CloudDownload, CloudUpload } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'
import { RelayForm } from '@/components/page/settings/relay/RelayForm'
import { RelayTable } from '@/components/page/settings/relay/RelayTable'
import { readSetting, writeSetting } from '@/lib/setting/storage'
import { Button } from '@/shadcn-ui/components/ui/button'

export const Route = createFileRoute({
  component: RouteComponent,
})

function RouteComponent() {
  const [relays, setRelays] = useState<SettingValue<'relays'>>(() => {
    return readSetting('relays') ?? []
  })
  const isInitialized = useRef(false)

  // リレーの状態が変更されるたびにlocalstorageに保存
  useEffect(() => {
    if (!isInitialized.current) {
      isInitialized.current = true
      return
    }
    writeSetting('relays', relays)
  }, [relays])

  function handleAddRelay(url: string) {
    setRelays((relays) => {
      return [...relays, { url, read: true, write: true }]
    })
  }

  function handleUpdateRelay(index: number, relay: SettingValue<'relays'>[number]) {
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
