CREATE TABLE "projects" (
	"id" serial PRIMARY KEY NOT NULL,
	"title" text NOT NULL,
	"description" text NOT NULL,
	"tags" text[] NOT NULL,
	"logo_src" text NOT NULL,
	"logo_alt" text NOT NULL,
	"project_url" text NOT NULL,
	"date" text NOT NULL,
	"image_src" text,
	"youtube_url" text,
	"featured" boolean DEFAULT false,
	"sort_order" serial NOT NULL,
	"created_at" timestamp DEFAULT now(),
	"updated_at" timestamp DEFAULT now()
);
