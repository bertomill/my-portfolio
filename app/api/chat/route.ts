import { NextRequest, NextResponse } from 'next/server'
import { openai } from '@ai-sdk/openai'
import { generateText } from 'ai'
import { drizzle } from 'drizzle-orm/postgres-js'
import { projects } from '@/lib/schema'
import { or, ilike, sql } from 'drizzle-orm'
import postgres from 'postgres'

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
    
    // Generate AI response with project context
    const { text } = await generateText({
      model: openai('gpt-3.5-turbo'),
      messages: [
        {
          role: 'system',
          content: `You are an AI assistant for a personal portfolio website. Answer questions about the person's projects and experience in a friendly, conversational tone. 
          
          Here are the relevant projects from the database:
          ${relevantProjects.map(p => `
          - ${p.title}: ${p.description}
          - Technologies: ${p.tags.join(', ')}
          - Date: ${p.date}
          - URL: ${p.projectUrl}
          `).join('\n')}
          
          If no relevant projects are found, provide a helpful response about the portfolio in general.
          Keep responses concise but informative.`
        },
        {
          role: 'user',
          content: message
        }
      ],
      temperature: 0.7,
    })

    return NextResponse.json({ response: text })
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