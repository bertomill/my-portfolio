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
    return NextResponse.json({ error: 'Failed to add book' }, { status: 500 })
  }
}