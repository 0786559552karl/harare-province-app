import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'

export async function POST(req: NextRequest) {
  const { pin_rs, national_id } = await req.json()
  const supabase = await createClient()

  const { data, error } = await supabase
    .from('residents')
    .select('id, name, surname, national_id, pin_rs, farm_name, contact_number, employment_status')
    .eq('pin_rs', pin_rs)
    .eq('national_id', national_id)
    .single()

  if (error || !data) {
    return NextResponse.json({ found: false })
  }

  return NextResponse.json({ found: true, resident: data })
}
