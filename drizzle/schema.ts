import { pgTable, serial, text, boolean, timestamp } from "drizzle-orm/pg-core"
import { sql } from "drizzle-orm"



export const projects = pgTable("projects", {
	id: serial().primaryKey().notNull(),
	title: text().notNull(),
	description: text().notNull(),
	tags: text().array().notNull(),
	logoSrc: text("logo_src").notNull(),
	logoAlt: text("logo_alt").notNull(),
	projectUrl: text("project_url").notNull(),
	date: text().notNull(),
	imageSrc: text("image_src"),
	featured: boolean().default(false),
	sortOrder: serial("sort_order").notNull(),
	createdAt: timestamp("created_at", { mode: 'string' }).defaultNow(),
	updatedAt: timestamp("updated_at", { mode: 'string' }).defaultNow(),
	youtubeUrl: text("youtube_url"),
});
