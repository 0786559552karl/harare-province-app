'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Search, UserPlus, Eye, ChevronLeft, ChevronRight } from 'lucide-react'

type Member = {
  id: string
  pin_rs: string
  name: string
  surname: string
  national_id: string
  farm_name: string
  constituency: string
  gender: string
  created_at: string
}

export default function MembersPage() {
  const [members, setMembers] = useState<Member[]>([])
  const [search, setSearch] = useState('')
  const [loading, setLoading] = useState(true)
  const [page, setPage] = useState(1)
  const [total, setTotal] = useState(0)
  const perPage = 20

  const fetchMembers = async () => {
    setLoading(true)
    try {
      const res = await fetch(`/api/admin/residents?search=${encodeURIComponent(search)}&page=${page}&per_page=${perPage}`)
      const data = await res.json()
      setMembers(data.residents || [])
      setTotal(data.total || 0)
    } catch {}
    setLoading(false)
  }

  useEffect(() => { fetchMembers() }, [page])

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    setPage(1)
    fetchMembers()
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">All Members</h1>
          <p className="text-muted-foreground">{total} registered members</p>
        </div>
        <Link href="/admin/register">
          <Button className="bg-green-700 hover:bg-green-800">
            <UserPlus className="w-4 h-4 mr-2" />
            Register New
          </Button>
        </Link>
      </div>

      <form onSubmit={handleSearch} className="flex gap-2">
        <Input
          placeholder="Search by name, ID, PIN/RS..."
          value={search}
          onChange={e => setSearch(e.target.value)}
          className="max-w-md"
        />
        <Button type="submit" variant="outline">
          <Search className="w-4 h-4" />
        </Button>
      </form>

      <Card>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="border-b bg-muted/50">
                <tr>
                  {['PIN/RS', 'Name', 'Surname', 'National ID', 'Farm', 'Constituency', 'Gender', 'Registered', 'Action'].map(h => (
                    <th key={h} className="px-4 py-3 text-left text-xs font-medium text-muted-foreground uppercase">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y">
                {loading ? (
                  <tr><td colSpan={9} className="px-4 py-8 text-center text-muted-foreground">Loading...</td></tr>
                ) : members.length === 0 ? (
                  <tr><td colSpan={9} className="px-4 py-8 text-center text-muted-foreground">No members found</td></tr>
                ) : members.map(m => (
                  <tr key={m.id} className="hover:bg-muted/30">
                    <td className="px-4 py-3 text-sm font-mono">{m.pin_rs}</td>
                    <td className="px-4 py-3 text-sm">{m.name}</td>
                    <td className="px-4 py-3 text-sm">{m.surname}</td>
                    <td className="px-4 py-3 text-sm font-mono">{m.national_id}</td>
                    <td className="px-4 py-3 text-sm">{m.farm_name}</td>
                    <td className="px-4 py-3 text-sm">{m.constituency}</td>
                    <td className="px-4 py-3 text-sm">
                      <Badge variant={m.gender === 'M' ? 'default' : 'secondary'}>{m.gender}</Badge>
                    </td>
                    <td className="px-4 py-3 text-sm text-muted-foreground">{new Date(m.created_at).toLocaleDateString()}</td>
                    <td className="px-4 py-3">
                      <Link href={`/admin/members/${m.id}`}>
                        <Button size="sm" variant="ghost"><Eye className="w-4 h-4" /></Button>
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {total > perPage && (
        <div className="flex items-center justify-between">
          <p className="text-sm text-muted-foreground">Page {page} of {Math.ceil(total / perPage)}</p>
          <div className="flex gap-2">
            <Button variant="outline" size="sm" disabled={page === 1} onClick={() => setPage(p => p - 1)}>
              <ChevronLeft className="w-4 h-4" />
            </Button>
            <Button variant="outline" size="sm" disabled={page >= Math.ceil(total / perPage)} onClick={() => setPage(p => p + 1)}>
              <ChevronRight className="w-4 h-4" />
            </Button>
          </div>
        </div>
      )}
    </div>
  )
}
