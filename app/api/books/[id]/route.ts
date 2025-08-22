import { NextResponse } from 'next/server'
import { Pool } from 'pg'

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
})

export async function GET(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params
    
    if (!id) {
      return NextResponse.json({ error: 'Book ID is required' }, { status: 400 })
    }

    const result = await pool.query('SELECT * FROM books WHERE id = $1', [id])
    
    if (result.rows.length === 0) {
      return NextResponse.json({ error: 'Book not found' }, { status: 404 })
    }

    return NextResponse.json(result.rows[0])
  } catch (error) {
    console.error('Error fetching book:', error)
    return NextResponse.json({ error: 'Failed to fetch book' }, { status: 500 })
  }
}

export async function PUT(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params
    const { title, description, what_i_learned, date_read, link } = await req.json()
    
    if (!id) {
      return NextResponse.json({ error: 'Book ID is required' }, { status: 400 })
    }

    const result = await pool.query(
      'UPDATE books SET title = $1, description = $2, what_i_learned = $3, date_read = $4, link = $5 WHERE id = $6 RETURNING *',
      [title, description, what_i_learned, date_read, link, id]
    )

    if (result.rows.length === 0) {
      return NextResponse.json({ error: 'Book not found' }, { status: 404 })
    }

    return NextResponse.json(result.rows[0])
  } catch (error) {
    console.error('Error updating book:', error)
    return NextResponse.json({ error: 'Failed to update book' }, { status: 500 })
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params
    
    if (!id) {
      return NextResponse.json({ error: 'Book ID is required' }, { status: 400 })
    }

    const result = await pool.query('DELETE FROM books WHERE id = $1 RETURNING *', [id])

    if (result.rows.length === 0) {
      return NextResponse.json({ error: 'Book not found' }, { status: 404 })
    }

    return NextResponse.json({ message: 'Book deleted successfully', deletedBook: result.rows[0] })
  } catch (error) {
    console.error('Error deleting book:', error)
    return NextResponse.json({ error: 'Failed to delete book' }, { status: 500 })
  }
}