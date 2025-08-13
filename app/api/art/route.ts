import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { db } from '@/lib/db'
import { artPieces } from '@/lib/schema'
import { desc } from 'drizzle-orm'

export async function GET() {
  try {
    const allArtPieces = await db
      .select()
      .from(artPieces)
      .orderBy(desc(artPieces.sortOrder))

    return NextResponse.json(allArtPieces)
  } catch (error) {
    console.error('Error fetching art pieces:', error)
    return NextResponse.json(
      { error: 'Failed to fetch art pieces' },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const body = await request.json()
    const { title, description, src, href, featured } = body

    if (!title || !src) {
      return NextResponse.json(
        { error: 'Title and src are required' },
        { status: 400 }
      )
    }

    const newArtPiece = await db
      .insert(artPieces)
      .values({
        title,
        description,
        src,
        href,
        featured: featured || false,
      })
      .returning()

    return NextResponse.json(newArtPiece[0], { status: 201 })
  } catch (error) {
    console.error('Error creating art piece:', error)
    return NextResponse.json(
      { error: 'Failed to create art piece' },
      { status: 500 }
    )
  }
}