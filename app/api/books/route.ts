import { NextResponse } from 'next/server'
import { Client } from '@notionhq/client'

const notion = new Client({
  auth: process.env.NOTION_TOKEN,
})

const DATABASE_ID = process.env.NOTION_BOOKS_DATABASE_ID || '2439b77f390680d79454ce4c66b6062e'

export async function GET() {
  console.log('📚 Books API called')
  console.log('🔑 NOTION_TOKEN exists:', !!process.env.NOTION_TOKEN)
  console.log('🗃️ DATABASE_ID:', DATABASE_ID)
  
  try {
    console.log('🔍 Querying Notion database...')
    const response = await notion.databases.query({
      database_id: DATABASE_ID,
    })

    console.log('✅ Notion response received')
    console.log('📊 Total results:', response.results.length)
    console.log('🔍 Raw response:', JSON.stringify(response, null, 2))

    const books = response.results.map((page: any, index: number) => {
      console.log(`📖 Processing book ${index + 1}:`)
      console.log('📄 Page properties:', JSON.stringify(page.properties, null, 2))
      
      const properties = page.properties
      
      const book = {
        id: page.id,
        title: properties.Title?.title?.[0]?.plain_text || 'Untitled',
        author: 'Unknown Author', // No author field in your DB
        status: 'completed', // Assuming all books are read since no status field
        rating: null, // No rating field in your DB
        category: 'General', // No category field in your DB
        description: properties['Why I read this book']?.rich_text?.[0]?.plain_text || '',
        dateRead: null, // No date read field in your DB
        notes: properties.Comments?.rich_text?.[0]?.plain_text || '',
        recommendation: properties['This book is good for someone who']?.rich_text?.[0]?.plain_text || '',
        createdTime: properties['Created time']?.created_time || null,
      }
      
      console.log('📚 Processed book:', book)
      return book
    })

    console.log('✅ Final books array:', books)
    console.log('📊 Returning', books.length, 'books')
    
    return NextResponse.json(books)
  } catch (error) {
    console.error('❌ Error fetching books from Notion:', error)
    console.error('❌ Error details:', {
      message: error instanceof Error ? error.message : 'Unknown error',
      stack: error instanceof Error ? error.stack : 'No stack trace',
    })
    return NextResponse.json(
      { error: 'Failed to fetch books', details: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    )
  }
}