import { drizzle } from 'drizzle-orm/postgres-js'
import postgres from 'postgres'
import * as schema from './schema'
import { config } from 'dotenv'

// Load environment variables
config({ path: '.env.local' })

if (!process.env.DATABASE_URL) {
  throw new Error('DATABASE_URL is not set')
}

const client = postgres(process.env.DATABASE_URL, { 
  ssl: 'require',
  max: 1 
})

export const db = drizzle(client, { schema }) 