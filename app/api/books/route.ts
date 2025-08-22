import { NextResponse } from 'next/server'
import { Pool } from 'pg'

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
})

export async function GET() {
  try {
    const { rows } = await pool.query('SELECT * FROM books ORDER BY date_read DESC')
    return NextResponse.json(rows)
  } catch (error) {
    console.error('Error fetching books:', error)
    return NextResponse.json({ error: 'Failed to fetch books' }, { status: 500 })
  }
}

export async function POST(req: Request) {
  try {
    const { title, description, what_i_learned, date_read, link } = await req.json()
    const result = await pool.query(
      'INSERT INTO books (title, description, what_i_learned, date_read, link) VALUES ($1, $2, $3, $4, $5) RETURNING *',
      [title, description, what_i_learned, date_read, link]
    )
    return NextResponse.json(result.rows[0])
  } catch (error) {
    console.error('Error adding book:', error)
    return NextResponse.json({ error: 'Failed to add book' }, { status: 500 })
  }
}

export async function PUT(req: Request) {
  try {
    const { id, title, description, what_i_learned, date_read, link } = await req.json()
    
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

export async function DELETE(req: Request) {
  try {
    const { id } = await req.json()
    
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