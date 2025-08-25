import { RecursiveCharacterTextSplitter } from '@langchain/textsplitters'
import { openai } from '@ai-sdk/openai'
import { embed } from 'ai'
import { db } from './db'
import { documentChunks, type NewDocumentChunk } from './schema'
import { readFile } from 'fs/promises'
import { join } from 'path'
import pdf from 'pdf-parse'
import { v4 as uuidv4 } from 'uuid'
import { sql } from 'drizzle-orm'

// Interface for document chunk metadata
interface DocumentChunkMetadata {
  source: string
  [key: string]: unknown
}

// Interface for document chunk input
interface DocumentChunkInput {
  content: string
  metadata: DocumentChunkMetadata
  source: string
  chunkIndex: number
}

// Interface for search result
interface SearchResult {
  id: string
  content: string
  metadata: DocumentChunkMetadata
  source: string
  chunkIndex: number
  similarity: number
}

// Text splitter configuration (matching your Python settings)
const textSplitter = new RecursiveCharacterTextSplitter({
  chunkSize: 1000,
  chunkOverlap: 200,
})

/**
 * Load and process a single document file
 */
export async function loadDocument(filePath: string): Promise<string> {
  const fullPath = join(process.cwd(), 'documents', filePath)
  
  if (filePath.endsWith('.pdf')) {
    const buffer = await readFile(fullPath)
    const data = await pdf(buffer)
    return data.text
  } else if (filePath.endsWith('.txt') || filePath.endsWith('.md')) {
    return await readFile(fullPath, 'utf-8')
  } else {
    throw new Error(`Unsupported file type: ${filePath}`)
  }
}

/**
 * Split text into chunks using the same settings as Python version
 */
export async function splitTextIntoChunks(text: string, source: string): Promise<DocumentChunkInput[]> {
  const docs = await textSplitter.createDocuments([text], [{ source }])
  return docs.map((doc, index) => ({
    content: doc.pageContent,
    metadata: doc.metadata as DocumentChunkMetadata,
    source,
    chunkIndex: index,
  }))
}

/**
 * Generate embeddings for text using OpenAI
 */
export async function generateEmbedding(text: string): Promise<number[]> {
  const { embedding } = await embed({
    model: openai.embedding('text-embedding-ada-002'),
    value: text,
  })
  return embedding
}

/**
 * Store document chunks with embeddings in the database
 */
export async function storeDocumentChunks(chunks: DocumentChunkInput[]) {
  const chunksWithEmbeddings: NewDocumentChunk[] = []
  
  console.log(`🧠 Generating embeddings for ${chunks.length} chunks...`)
  
  for (let i = 0; i < chunks.length; i++) {
    const chunk = chunks[i]
    console.log(`Processing chunk ${i + 1}/${chunks.length}`)
    
    const embedding = await generateEmbedding(chunk.content)
    
    chunksWithEmbeddings.push({
      id: uuidv4(),
      content: chunk.content,
      metadata: chunk.metadata,
      embedding: embedding,
      source: chunk.source,
      chunkIndex: chunk.chunkIndex,
    })
    
    // Small delay to avoid rate limits
    await new Promise(resolve => setTimeout(resolve, 100))
  }
  
  console.log(`💾 Storing ${chunksWithEmbeddings.length} chunks in database...`)
  await db.insert(documentChunks).values(chunksWithEmbeddings)
  
  return chunksWithEmbeddings.length
}

/**
 * Search for similar document chunks using vector similarity
 */
export async function searchSimilarChunks(query: string, limit: number = 4): Promise<SearchResult[]> {
  // Generate embedding for the query
  const queryEmbedding = await generateEmbedding(query)
  
  // Perform vector similarity search using proper array formatting
  const results = await db.execute(sql`
    SELECT 
      id,
      content,
      metadata,
      source,
      chunk_index,
      1 - (embedding <=> ${JSON.stringify(queryEmbedding)}::vector) as similarity
    FROM document_chunks
    ORDER BY embedding <=> ${JSON.stringify(queryEmbedding)}::vector
    LIMIT ${limit}
  `)
  
  // db.execute() returns results directly as an array-like object
  return Array.from(results).map((row: Record<string, unknown>) => ({
    id: row.id as string,
    content: row.content as string,
    metadata: row.metadata as DocumentChunkMetadata,
    source: row.source as string,
    chunkIndex: row.chunk_index as number,
    similarity: row.similarity as number,
  }))
}

/**
 * Process all documents in the documents folder
 */
export async function indexAllDocuments(): Promise<number> {
  const documentsPath = join(process.cwd(), 'documents')
  
  try {
    const { readdir } = await import('fs/promises')
    const files = await readdir(documentsPath)
    
    console.log(`📚 Found ${files.length} files to process`)
    
    let totalChunks = 0
    
    for (const file of files) {
      if (file === 'README.md' || file.startsWith('.')) continue
      
      console.log(`📄 Processing: ${file}`)
      
      try {
        const content = await loadDocument(file)
        const chunks = await splitTextIntoChunks(content, file)
        const stored = await storeDocumentChunks(chunks)
        
        console.log(`✅ Processed ${file}: ${stored} chunks`)
        totalChunks += stored
        
      } catch (error) {
        console.error(`❌ Error processing ${file}:`, error)
      }
    }
    
    console.log(`🎉 Indexing complete! Total chunks: ${totalChunks}`)
    return totalChunks
    
  } catch (error) {
    console.error('Error indexing documents:', error)
    throw error
  }
}