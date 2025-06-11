import { mouse } from '@mouse_484/eslint-config'

export default mouse(
  {
    react: true,
    ignores: ['**/*.gen.ts', '**/src/shadcn-ui/**'],
  },
)
