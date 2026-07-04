import { NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'

export async function GET() {
  const supabase = await createClient()
  const { data: residents } = await supabase.from('residents').select('*').limit(100)

  if (!residents || residents.length === 0) {
    return NextResponse.json({ insights: [] })
  }

  const insights = []

  const total = residents.length
  const maleCount = residents.filter((r: any) => r.gender === 'M').length
  const femaleCount = total - maleCount

  insights.push({
    category: 'Demographics',
    title: 'Gender Distribution',
    description: `${maleCount} male (${Math.round(maleCount/total*100)}%) and ${femaleCount} female (${Math.round(femaleCount/total*100)}%) members registered.`,
    priority: 'low'
  })

  const employed = residents.filter((r: any) => r.employment_status === 'Employed').length
  if (employed / total < 0.3) {
    insights.push({
      category: 'Employment',
      title: 'High Unemployment Rate',
      description: `Only ${Math.round(employed/total*100)}% of members are formally employed. Consider community skills development programmes.`,
      priority: 'high'
    })
  }

  return NextResponse.json({ insights })
}
