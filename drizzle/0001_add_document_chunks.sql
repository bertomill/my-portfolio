-- Add pgvector extension for vector similarity search
CREATE EXTENSION IF NOT EXISTS vector;

-- Create document_chunks table for RAG functionality
CREATE TABLE "document_chunks" (
	"id" text PRIMARY KEY NOT NULL,
	"content" text NOT NULL,
	"metadata" jsonb,
	"embedding" vector(1536), -- OpenAI embedding size
	"source" text NOT NULL,
	"chunk_index" integer NOT NULL,
	"created_at" timestamp DEFAULT now()
);

-- Add index for vector similarity search
CREATE INDEX idx_document_chunks_embedding ON document_chunks USING ivfflat (embedding vector_cosine_ops);

-- Create books table
CREATE TABLE "books" (
	"id" serial PRIMARY KEY NOT NULL,
	"title" text NOT NULL,
	"description" text,
	"what_i_learned" text,
	"date_read" text,
	"link" text,
	"created_at" timestamp DEFAULT now(),
	"updated_at" timestamp DEFAULT now()
);
