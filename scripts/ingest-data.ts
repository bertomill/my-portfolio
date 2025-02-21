import { Pinecone } from '@pinecone-database/pinecone'
import { Document } from '@langchain/core/documents'
import { HuggingFaceInferenceEmbeddings } from '@langchain/community/embeddings/hf'
import { PineconeStore } from '@langchain/pinecone'
import * as dotenv from 'dotenv'

// Load environment variables
dotenv.config({ path: '.env.local' })

// Verify environment variables are loaded
console.log('Checking environment variables...')
if (!process.env.PINECONE_API_KEY) {
  throw new Error('PINECONE_API_KEY is not set in .env.local')
}
if (!process.env.PINECONE_ENVIRONMENT) {
  throw new Error('PINECONE_ENVIRONMENT is not set in .env.local')
}
if (!process.env.PINECONE_INDEX) {
  throw new Error('PINECONE_INDEX is not set in .env.local')
}
if (!process.env.HUGGINGFACE_API_KEY) {
  throw new Error('HUGGINGFACE_API_KEY is not set in .env.local')
}

const portfolioData = [
  // Introduction
  {
    text: "Hi, I'm Robert. I am an application developer passionate about crafting intuitive user experiences to help people and businesses solve problems.",
    metadata: { source: 'about', type: 'introduction' }
  },
  
  // Professional Summary
  {
    text: "I specialize in full-stack development with a focus on creating seamless, user-centric applications. My expertise includes React, TypeScript, Next.js, and modern web technologies.",
    metadata: { source: 'about', type: 'professional_summary' }
  },

  // Technical Skills
  {
    text: "My technical skills include: Frontend Development (React, Next.js, TypeScript, TailwindCSS), Backend Development (Node.js, Express, APIs), Database Management (PostgreSQL, MongoDB), and Cloud Services (AWS, Vercel).",
    metadata: { source: 'skills', type: 'technical' }
  },

  // Project Experience
  {
    text: "I've developed a portfolio website using Next.js 13, React, and TypeScript, featuring a dark mode theme, responsive design, and an AI-powered chat interface for visitor interaction.",
    metadata: { source: 'projects', type: 'portfolio' }
  },

  // Work Approach
  {
    text: "I believe in writing clean, maintainable code and using modern development practices. I'm passionate about creating accessible and performant web applications.",
    metadata: { source: 'about', type: 'work_philosophy' }
  },

  // Contact Information
  {
    text: "You can find my projects on GitHub and connect with me professionally. I'm always interested in discussing new technologies and potential collaborations.",
    metadata: { source: 'contact', type: 'professional_network' }
  }
]

async function ingestData() {
  try {
    console.log('Starting data ingestion...')
    console.log('Initializing Pinecone client...')
    
    const pinecone = new Pinecone({
      apiKey: process.env.PINECONE_API_KEY!,
      environment: process.env.PINECONE_ENVIRONMENT!
    })

    console.log('Getting Pinecone index...')
    const index = pinecone.Index(process.env.PINECONE_INDEX!)

    console.log('Initializing HuggingFace embeddings...')
    const embeddings = new HuggingFaceInferenceEmbeddings({
      apiKey: process.env.HUGGINGFACE_API_KEY,
      model: "text-embedding-3-small"
    })

    console.log('Creating documents...')
    const docs = portfolioData.map(
      (item) => new Document({ 
        pageContent: item.text, 
        metadata: {
          ...item.metadata,
          timestamp: new Date().toISOString()
        }
      })
    )

    console.log(`Ingesting ${docs.length} documents...`)
    await PineconeStore.fromDocuments(docs, embeddings, {
      pineconeIndex: index,
      namespace: 'robert-portfolio',
    })

    console.log('Data ingestion complete! ✨')
  } catch (error) {
    console.error('Error details:', {
      message: error.message,
      stack: error.stack,
      cause: error.cause
    })
    throw error
  }
}

ingestData().catch(console.error) 