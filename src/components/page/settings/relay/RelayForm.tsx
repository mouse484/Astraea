import { standardSchemaResolver } from '@hookform/resolvers/standard-schema'
import { useForm } from 'react-hook-form'
import { z } from 'zod/v4'

import { RelayUrlSchema } from '@/lib/nostr/schemas/common'
import { Button } from '@/shadcn-ui/components/ui/button'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/shadcn-ui/components/ui/form'
import { Input } from '@/shadcn-ui/components/ui/input'

const formSchema = z.object({
  relay: RelayUrlSchema,
})

interface RelayFormProps {
  onAddRelay: (url: string) => void
}

export function RelayForm({ onAddRelay }: RelayFormProps) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: standardSchemaResolver(formSchema),
  })

  function onSubmit(values: z.infer<typeof formSchema>) {
    onAddRelay(values.relay)
    form.reset()
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="relay"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Ralay</FormLabel>
              <FormControl>
                <Input type="url" placeholder="wss://relay.example.com" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button
          type="submit"
          className="ml-2"
          disabled={!form.formState.isValid || form.formState.isSubmitting}
        >
          Create
        </Button>
      </form>
    </Form>
  )
}
