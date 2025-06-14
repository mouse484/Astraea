import { Schema } from 'effect'
import { URLSchema } from '../schemas/common'

export const MetadataExtraFieldsSchema = Schema.Struct({
  display_name: Schema.String,
  website: URLSchema,
  banner: URLSchema,
  bot: Schema.Boolean,
  birthday: Schema.Struct({
    year: Schema.Number,
    month: Schema.Number,
    day: Schema.Number,
  }),
  /**
   * @deprecated use `display_name` instead
   */
  displayName: Schema.String,
  /**
   * @deprecated use `name` instead
   */
  username: Schema.String,
})
