import { drizzle } from 'drizzle-orm/postgres-js'
import postgres from 'postgres'
import { artPieces } from '../lib/schema'
import { config } from 'dotenv'

// Load environment variables
config({ path: '.env.local' })
config({ path: '.env' })

if (!process.env.DATABASE_URL) {
  throw new Error('DATABASE_URL is not set')
}

const client = postgres(process.env.DATABASE_URL, { 
  ssl: 'require',
  max: 1 
})

const db = drizzle(client, { schema: { artPieces } })

async function seedArt() {
  try {
    console.log('Seeding art pieces...')
    
    await db.insert(artPieces).values([
      {
        title: 'Abstract Circles',
        description: 'Digital abstract composition in soft tones',
        src: '/art/abstract-circles.png',
        href: '/art/abstract-circles.png',
        featured: false,
      },
      {
        title: 'Japanese Cottage',
        description: 'Serene countryside watercolor-inspired piece',
        src: '/art/japanese-cottage.png',
        href: '/art/japanese-cottage.png',
        featured: false,
      },
    ])

    console.log('Art pieces seeded successfully!')
  } catch (error) {
    console.error('Error seeding art pieces:', error)
  } finally {
    await client.end()
  }
}

seedArt()