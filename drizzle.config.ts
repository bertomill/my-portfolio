import type { Config } from 'drizzle-kit'
import { config } from 'dotenv'

// Load environment variables
config({ path: '.env.local' })

export default {
  schema: './lib/schema.ts',
  out: './drizzle',
  dialect: 'postgresql',
  dbCredentials: {
    url: process.env.DATABASE_URL!,
  },
} satisfies Config So the URLs in the projects page are not clickable. I'll show you the exact section on the home page of the projects, but I just sent a screenshot of the Neon Database URL connection. So maybe that's the issue, but let's just see if it will work.