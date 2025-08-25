/**
 * Script to set up RAG (Retrieval-Augmented Generation) functionality
 * This script processes documents and indexes them for semantic search
 */

import { loadDocument, splitTextIntoChunks, storeDocumentChunks } from '../lib/rag-utils'
import { drizzle } from 'drizzle-orm/postgres-js'
import { documentChunks } from '../lib/schema'
import postgres from 'postgres'

const client = postgres(process.env.DATABASE_URL!)
const db = drizzle(client)

async function setupRAG() {
  console.log('🚀 Setting up RAG functionality...')
  
  try {
    // Check if we have documents to process
    console.log('📄 Processing resume.pdf...')
    
    // Load and process the resume
    const resumeContent = await loadDocument('resume.pdf')
    console.log(`✅ Loaded resume (${resumeContent.length} characters)`)
    
    // Split into chunks
    const chunks = await splitTextIntoChunks(resumeContent, 'resume.pdf')
    console.log(`📝 Split into ${chunks.length} chunks`)
    
    // Clear existing chunks for this document first
    console.log('🧹 Clearing existing resume chunks...')
    // Note: You may want to add a delete operation here
    
    // Store chunks with embeddings
    console.log('💾 Storing chunks with embeddings...')
    const storedCount = await storeDocumentChunks(chunks)
    console.log(`✅ Successfully stored ${storedCount} chunks`)
    
    console.log('🎉 RAG setup complete!')
    console.log('You can now ask the chat about specific details from your resume, including football coaching experience!')
    
  } catch (error) {
    console.error('❌ Error setting up RAG:', error)
    process.exit(1)
  } finally {
    await client.end()
  }
}

// Run the setup
setupRAG()
