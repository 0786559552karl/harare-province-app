import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const supabase = await createClient()
    await supabase.from('location_logs').insert([{
      latitude: body.latitude,
      longitude: body.longitude,
      user_agent: req.headers.get('user-agent'),
      created_at: new Date().toISOString()
    }])
    return NextResponse.json({ success: true })
  } catch {
    return NextResponse.json({ success: false })
  }
}
