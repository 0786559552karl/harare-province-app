import { NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'

export async function GET() {
  const supabase = await createClient()

  const [totalRes, farmRes, recentRes] = await Promise.all([
    supabase.from('residents').select('id', { count: 'exact', head: true }),
    supabase.from('residents').select('farm_name').not('farm_name', 'is', null),
    supabase.from('residents').select('id', { count: 'exact', head: true })
      .gte('created_at', new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString())
  ])

  const farms = new Set((farmRes.data || []).map((r: any) => r.farm_name)).size

  // Farm breakdown
  const { data: farmData } = await supabase
    .from('residents')
    .select('farm_name')

  const farmCounts: Record<string, number> = {}
  ;(farmData || []).forEach((r: any) => {
    if (r.farm_name) farmCounts[r.farm_name] = (farmCounts[r.farm_name] || 0) + 1
  })
  const byFarm = Object.entries(farmCounts).map(([name, count]) => ({ name, count }))

  // Ownership breakdown
  const { data: ownerData } = await supabase.from('residents').select('farm_ownership')
  const ownerCounts: Record<string, number> = {}
  ;(ownerData || []).forEach((r: any) => {
    if (r.farm_ownership) ownerCounts[r.farm_ownership] = (ownerCounts[r.farm_ownership] || 0) + 1
  })
  const byOwnership = Object.entries(ownerCounts).map(([type, count]) => ({ type, count }))

  return NextResponse.json({
    total: totalRes.count || 0,
    farms,
    recent: recentRes.count || 0,
    byFarm,
    byOwnership
  })
}
