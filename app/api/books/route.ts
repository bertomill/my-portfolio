import { NextResponse } from 'next/server'
import { Client } from '@notionhq/client'

const notion = new Client({
  auth: process.env.NOTION_TOKEN,
})

const DATABASE_ID = process.env.NOTION_BOOKS_DATABASE_ID || '2439b77f390680d79454ce4c66b6062e'

export async function GET() {
  try {
    const response = await notion.databases.query({
      database_id: DATABASE_ID,
      sorts: [
        {
          property: 'Status',
          direction: 'ascending',
        },
      ],
    })

    const books = response.results.map((page: any) => {
      const properties = page.properties

      return {
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
    })

    return NextResponse.json(books)
  } catch (error) {
    console.error('Error fetching books from Notion:', error)
    return NextResponse.json(
      { error: 'Failed to fetch books' },
      { status: 500 }
    )
  }
}