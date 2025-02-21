import { NextResponse } from 'next/server'
import { Pinecone } from '@pinecone-database/pinecone'
import { HuggingFaceInferenceEmbeddings } from '@langchain/community/embeddings/hf'
import { HuggingFaceInference } from '@langchain/community/llms/hf'

export async function POST(req: Request) {
  try {
    console.log('Starting chat process...')
    
    // Initialize Pinecone with required environment
    const pc = new Pinecone({
      apiKey: 'pcsk_5Binbm_Cbo4Yrj86hGMk4Q2g425U9JyVrmRnBK1x2DEBHZWbbthKRPD6329nR9MpqA3pKZ',
      environment: 'gcp-starter'  // Added required environment
    })

    const index = pc.Index('bertomill')
    console.log('Connected to Pinecone index')

    // Initialize embeddings
    const embeddings = new HuggingFaceInferenceEmbeddings({
      apiKey: process.env.HUGGINGFACE_API_KEY,
      model: "sentence-transformers/all-mpnet-base-v2",
    })
    console.log('Initialized embeddings')

    // Get message from request
    const { message } = await req.json()
    console.log('Received message:', message)

    // Create embeddings for the query
    const queryEmbedding = await embeddings.embedQuery(message)
    console.log('Created query embedding')

    // Query the index with correct format
    const queryResponse = await index.query({
      vector: queryEmbedding,
      topK: 1,
      includeMetadata: true
    })
    console.log('Query response:', queryResponse)

    // Extract context from the response
    const context = queryResponse.matches?.[0]?.metadata?.text || ''
    console.log('Context:', context)

    // Generate response using HuggingFace
    console.log('Generating response...')
    const model = new HuggingFaceInference({
      apiKey: process.env.HUGGINGFACE_API_KEY,
      model: "mistralai/Mistral-7B-Instruct-v0.2",
    })

    const prompt = `Based on this context: "${context}", answer this question: "${message}"`
    const response = await model.call(prompt)
    console.log('Generated response:', response)

    return NextResponse.json({ response })

  } catch (error: unknown) { // Fixed any type
    console.error('Error details:', {
      name: error instanceof Error ? error.name : 'Unknown',
      message: error instanceof Error ? error.message : String(error),
      stack: error instanceof Error ? error.stack : undefined
    })
    return NextResponse.json(
      { error: 'Failed to process your request', details: error instanceof Error ? error.message : String(error) },
      { status: 500 }
    )
  }
} 