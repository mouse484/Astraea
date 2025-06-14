import { Schema } from 'effect'

export const MetadataWithKind05Schema = Schema.Struct({
  /**
   * NIP-05 internet identifier (email-like address).
   * Local part restricted to a-z0-9-_., case-insensitive.
   */
  nip05: Schema.String.pipe(Schema.pattern(/^[a-z0-9-_.]+@[a-z0-9-_.]+$/)),
})
