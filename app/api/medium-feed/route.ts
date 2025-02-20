import Parser from 'rss-parser'
import { NextResponse } from 'next/server'

export async function GET() {
  try {
    const parser = new Parser()
    const feed = await parser.parseURL('https://medium.com/@bertomill/feed')
    
    const posts = feed.items.map(item => ({
      title: item.title,
      link: item.link,
      pubDate: item.pubDate,
      categories: item.categories || [],
      content: item.content,
      thumbnail: extractThumbnail(item['content:encoded'] || ''),
    }))

    return NextResponse.json({ posts })
  } catch (error) {
    console.error('Error fetching Medium feed:', error)
    return NextResponse.json({ error: 'Failed to fetch blog posts' }, { status: 500 })
  }
}

function extractThumbnail(content: string): string | undefined {
  const match = content.match(/<img[^>]+src="([^">]+)"/)
  return match ? match[1] : undefined
} 