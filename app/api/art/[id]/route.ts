import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { db } from '@/lib/db'
import { artPieces } from '@/lib/schema'
import { eq } from 'drizzle-orm'

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession(authOptions)
    
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const id = parseInt(params.id)
    if (isNaN(id)) {
      return NextResponse.json({ error: 'Invalid ID' }, { status: 400 })
    }

    const body = await request.json()
    const { title, description, src, href, featured } = body

    if (!title || !src) {
      return NextResponse.json(
        { error: 'Title and src are required' },
        { status: 400 }
      )
    }

    const updatedArtPiece = await db
      .update(artPieces)
      .set({
        title,
        description,
        src,
        href,
        featured: featured || false,
        updatedAt: new Date(),
      })
      .where(eq(artPieces.id, id))
      .returning()

    if (updatedArtPiece.length === 0) {
      return NextResponse.json({ error: 'Art piece not found' }, { status: 404 })
    }

    return NextResponse.json(updatedArtPiece[0])
  } catch (error) {
    console.error('Error updating art piece:', error)
    return NextResponse.json(
      { error: 'Failed to update art piece' },
      { status: 500 }
    )
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession(authOptions)
    
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const id = parseInt(params.id)
    if (isNaN(id)) {
      return NextResponse.json({ error: 'Invalid ID' }, { status: 400 })
    }

    const deletedArtPiece = await db
      .delete(artPieces)
      .where(eq(artPieces.id, id))
      .returning()

    if (deletedArtPiece.length === 0) {
      return NextResponse.json({ error: 'Art piece not found' }, { status: 404 })
    }

    return NextResponse.json({ message: 'Art piece deleted successfully' })
  } catch (error) {
    console.error('Error deleting art piece:', error)
    return NextResponse.json(
      { error: 'Failed to delete art piece' },
      { status: 500 }
    )
  }
}