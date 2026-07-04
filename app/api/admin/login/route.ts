import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'

export async function POST(req: NextRequest) {
  const { username, password } = await req.json()
  const supabase = await createClient()
  
  const { data, error } = await supabase
    .from('admin_users')
    .select('id, username, password_hash')
    .eq('username', username)
    .single()

  if (error || !data) {
    return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 })
  }

  // Simple comparison — in production use bcrypt
  if (data.password_hash !== password) {
    return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 })
  }

  const response = NextResponse.json({ success: true })
  response.cookies.set('admin_session', data.id, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    maxAge: 60 * 60 * 8,
    path: '/'
  })
  return response
}
