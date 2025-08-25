import { pgTable, text, timestamp, serial, boolean, vector, integer, jsonb } from 'drizzle-orm/pg-core'

export const projects = pgTable('projects', {
  id: serial('id').primaryKey(),
  title: text('title').notNull(),
  description: text('description').notNull(),
  tags: text('tags').array().notNull(), // Array of strings for tags
  logoSrc: text('logo_src').notNull(),
  logoAlt: text('logo_alt').notNull(),
  projectUrl: text('project_url').notNull(),
  date: text('date').notNull(), // We'll store as text since you're using "May 2025" format
  imageSrc: text('image_src'), // Optional project screenshot
  youtubeUrl: text('youtube_url'), // Optional YouTube walkthrough URL
  featured: boolean('featured').default(false), // To determine if it shows on home page
  sortOrder: serial('sort_order'), // For ordering projects
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow(),
})

export const artPieces = pgTable('art_pieces', {
  id: serial('id').primaryKey(),
  title: text('title').notNull(),
  description: text('description'),
  src: text('src').notNull(), // File path or URL to the art piece
  href: text('href'), // Optional external link
  featured: boolean('featured').default(false),
  sortOrder: serial('sort_order'), // For ordering art pieces
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow(),
})

export const books = pgTable('books', {
  id: serial('id').primaryKey(),
  title: text('title').notNull(),
  description: text('description'),
  what_i_learned: text('what_i_learned'),
  date_read: text('date_read'),
  link: text('link'),
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow(),
})

// RAG Document Chunks Table
export const documentChunks = pgTable('document_chunks', {
  id: text('id').primaryKey(),
  content: text('content').notNull(),
  metadata: jsonb('metadata'),
  embedding: vector('embedding', { dimensions: 1536 }), // OpenAI embedding size
  source: text('source').notNull(),
  chunkIndex: integer('chunk_index').notNull(),
  createdAt: timestamp('created_at').defaultNow(),
})

export type Project = typeof projects.$inferSelect
export type NewProject = typeof projects.$inferInsert
export type ArtPiece = typeof artPieces.$inferSelect
export type NewArtPiece = typeof artPieces.$inferInsert
export type Book = typeof books.$inferSelect
export type NewBook = typeof books.$inferInsert
export type DocumentChunk = typeof documentChunks.$inferSelect
export type NewDocumentChunk = typeof documentChunks.$inferInsert