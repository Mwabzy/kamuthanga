import { defineCliConfig } from 'sanity/cli'

export default defineCliConfig({
  api: {
    projectId: 'wqwaj8qw',
    dataset: 'production',
  },
  /**
   * Types are generated for the Next.js app one level up, so queries there stay
   * in sync with this schema. Run `npm run typegen` after changing either.
   */
  graphql: [],
})
