import { standardSchemaResolver } from '@hookform/resolvers/standard-schema'
import { Schema } from 'effect'

import { useForm } from 'react-hook-form'
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

const FormSchema = Schema.standardSchemaV1(
  Schema.Struct({
    relay: RelayUrlSchema,
  }),
)

interface RelayFormProps {
  onAddRelay: (url: string) => void
}

export function RelayForm({ onAddRelay }: RelayFormProps) {
  const form = useForm<typeof FormSchema.Type>({
    resolver: standardSchemaResolver(FormSchema),
  })

  function onSubmit(values: typeof FormSchema.Type) {
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
