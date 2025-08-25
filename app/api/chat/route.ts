import { NextRequest, NextResponse } from 'next/server'
import { openai } from '@ai-sdk/openai'
import { generateText } from 'ai'
import { drizzle } from 'drizzle-orm/postgres-js'
import { projects } from '@/lib/schema'
import { or, ilike, sql } from 'drizzle-orm'
import postgres from 'postgres'
// import { searchSimilarChunks } from '@/lib/rag-utils' // Temporarily disabled

const client = postgres(process.env.DATABASE_URL!)
const db = drizzle(client)

export async function POST(request: NextRequest) {
  try {
    const { message } = await request.json()
    
    if (!message) {
      return NextResponse.json({ error: 'Message is required' }, { status: 400 })
    }

    // Extract keywords from the user's message for database search
    const searchKeywords = extractKeywords(message)
    
    // Query database for relevant projects
    const relevantProjects = await searchProjects(searchKeywords)
    
    // RAG: Search for relevant document chunks - temporarily disabled
    const ragResults: Array<{
      id: string
      content: string
      metadata: Record<string, unknown>
      source: string
      chunkIndex: number
      similarity: number
    }> = []
    // TODO: Re-enable RAG search once database issues are resolved
    // try {
    //   ragResults = await searchSimilarChunks(message, 4)
    // } catch (error) {
    //   console.error('RAG search failed:', error)
    //   // Continue without RAG results
    // }
    
    // Prepare context from both projects and RAG documents
    const projectContext = relevantProjects.map(p => `
    - ${p.title}: ${p.description}
    - Technologies: ${p.tags.join(', ')}
    - Date: ${p.date}
    - URL: ${p.projectUrl}
    `).join('\n')
    
    const ragContext = ragResults.map(result => `
    Source: ${result.source}
    Content: ${result.content}
    `).join('\n')

    // Generate AI response with enhanced context
    const { text } = await generateText({
      model: openai('gpt-4o-mini'),
      messages: [
        {
          role: 'system',
          content: `You are an AI assistant for Robert Mill's personal portfolio website. Answer questions about Robert's projects, experience, and background in a friendly, conversational tone.

You have access to two types of information:

1. PROJECT DATABASE:
${projectContext}

2. PERSONAL DOCUMENTS (Resume, etc.):
${ragContext}

Instructions:
- Use the most relevant information from both sources to answer questions
- When referencing information from documents, you can mention the source (e.g., "According to Robert's resume...")
- Keep responses concise but informative
- If you reference specific achievements or experiences, try to be specific
- If no relevant information is found in either source, provide a helpful general response about the portfolio

Focus on being helpful and providing accurate information about Robert's background, skills, and projects.`
        },
        {
          role: 'user',
          content: message
        }
      ],
      temperature: 0.7,
    })

    // Prepare sources for frontend display
    const sources = ragResults.map(result => ({
      source: result.source,
      content: result.content.substring(0, 200) + '...',
      similarity: Math.round(result.similarity * 100),
      chunkIndex: result.chunkIndex
    }))

    return NextResponse.json({ 
      response: text,
      sources: sources.length > 0 ? sources : undefined
    })
  } catch (error) {
    console.error('Chat API error:', error)
    return NextResponse.json(
      { error: 'Failed to generate response' },
      { status: 500 }
    )
  }
}

function extractKeywords(message: string): string[] {
  // Simple keyword extraction - can be enhanced with NLP
  const commonWords = ['i', 'you', 'the', 'a', 'an', 'and', 'or', 'but', 'in', 'on', 'at', 'to', 'for', 'of', 'with', 'by', 'about', 'what', 'how', 'when', 'where', 'why', 'tell', 'me', 'show', 'do', 'have', 'any', 'projects', 'project', 'work', 'experience']
  
  return message
    .toLowerCase()
    .replace(/[^\w\s]/g, '')
    .split(/\s+/)
    .filter(word => word.length > 2 && !commonWords.includes(word))
    .slice(0, 5) // Limit to 5 keywords
}

async function searchProjects(keywords: string[]) {
  if (keywords.length === 0) {
    // Return featured projects if no keywords
    return await db
      .select()
      .from(projects)
      .where(sql`featured = true`)
      .limit(3)
  }

  const searchConditions = keywords.map(keyword => 
    or(
      ilike(projects.title, `%${keyword}%`),
      ilike(projects.description, `%${keyword}%`),
      sql`${projects.tags} @> ARRAY[${keyword}]::text[]`
    )
  )

  return await db
    .select()
    .from(projects)
    .where(or(...searchConditions))
    .limit(5)
}