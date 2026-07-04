import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'

export async function GET(req: NextRequest) {
  const supabase = await createClient()
  const { searchParams } = new URL(req.url)
  const type = searchParams.get('type') || 'residents'
  const format = searchParams.get('format') || 'csv'

  const { data } = await supabase.from('residents').select('*')

  if (format === 'json') {
    return NextResponse.json(data || [])
  }

  // CSV
  if (!data || data.length === 0) {
    return new NextResponse('No data', { status: 200 })
  }

  const headers = Object.keys(data[0])
  const csv = [
    headers.join(','),
    ...data.map(row => headers.map(h => JSON.stringify((row as any)[h] ?? '')).join(','))
  ].join('\n')

  return new NextResponse(csv, {
    headers: {
      'Content-Type': 'text/csv',
      'Content-Disposition': `attachment; filename="${type}_export.csv"`
    }
  })
}
