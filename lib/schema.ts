import { pgTable, text, timestamp, serial, boolean } from 'drizzle-orm/pg-core'

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
  featured: boolean('featured').default(false), // To determine if it shows on home page
  sortOrder: serial('sort_order'), // For ordering projects
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow(),
})

export type Project = typeof projects.$inferSelect
export type NewProject = typeof projects.$inferInsert 