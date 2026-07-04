'use client'

import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Search, CheckCircle2, AlertCircle, Loader2 } from 'lucide-react'

type SearchResult = {
  found: boolean
  resident?: {
    name: string
    surname: string
    national_id: string
    pin_rs: string
    farm_name: string
    contact_number: string
    employment_status: string
  }
}

export function SearchPortal() {
  const [pinRs, setPinRs] = useState('')
  const [nationalId, setNationalId] = useState('')
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState<SearchResult | null>(null)

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    try {
      const res = await fetch('/api/search-resident', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ pin_rs: pinRs, national_id: nationalId })
      })
      const data = await res.json()
      setResult(data)
    } catch {
      setResult({ found: false })
    }
    setLoading(false)
  }

  const resetSearch = () => {
    setResult(null)
    setPinRs('')
    setNationalId('')
  }

  return (
    <section className="flex-1 flex items-center justify-center p-6">
      <Card className="w-full max-w-md shadow-xl">
        <CardHeader>
          <CardTitle className="text-center text-green-800">Member Verification Portal</CardTitle>
          <p className="text-center text-sm text-muted-foreground">Harare Province — DISMS Communities ZW</p>
        </CardHeader>
        <CardContent>
          {!result ? (
            <form onSubmit={handleSearch} className="space-y-4">
              <div className="space-y-1">
                <Label>PIN / RS Number</Label>
                <Input
                  placeholder="Enter your PIN/RS number"
                  value={pinRs}
                  onChange={e => setPinRs(e.target.value)}
                  required
                />
              </div>
              <div className="space-y-1">
                <Label>National ID</Label>
                <Input
                  placeholder="Enter your National ID"
                  value={nationalId}
                  onChange={e => setNationalId(e.target.value)}
                  required
                />
              </div>
              <Button
                type="submit"
                className="w-full bg-green-700 hover:bg-green-800"
                disabled={loading}
              >
                {loading ? (
                  <><Loader2 className="w-4 h-4 mr-2 animate-spin" />Searching...</>
                ) : (
                  <><Search className="w-4 h-4 mr-2" />Verify Registration</>
                )}
              </Button>
            </form>
          ) : (
            <div className="space-y-4">
              {result.found && result.resident ? (
                <>
                  <div className="flex items-center gap-3 p-4 bg-green-50 rounded-xl border border-green-200">
                    <CheckCircle2 className="w-8 h-8 text-green-700" />
                    <div>
                      <p className="font-bold text-green-800">Verified Member</p>
                      <p className="text-sm text-muted-foreground">Registration confirmed and active</p>
                    </div>
                  </div>
                  <div className="rounded-xl border overflow-hidden">
                    <div className="px-4 py-2 bg-green-50 text-green-800 font-medium text-sm">Member Details</div>
                    <div className="p-4 space-y-2">
                      {[
                        { label: 'Full Name', value: `${result.resident.name} ${result.resident.surname}` },
                        { label: 'PIN/RS', value: result.resident.pin_rs },
                        { label: 'National ID', value: result.resident.national_id },
                        { label: 'Farm', value: result.resident.farm_name },
                        { label: 'Contact', value: result.resident.contact_number },
                      ].map((item, i) => (
                        <div key={i} className="flex justify-between py-1 border-b last:border-b-0">
                          <span className="text-sm text-muted-foreground">{item.label}</span>
                          <span className="text-sm font-medium">{item.value}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </>
              ) : (
                <div className="flex items-center gap-3 p-4 bg-red-50 rounded-xl border border-red-200">
                  <AlertCircle className="w-8 h-8 text-red-600" />
                  <div>
                    <p className="font-bold text-red-700">No Record Found</p>
                    <p className="text-sm text-muted-foreground">Please verify your details or contact administration</p>
                  </div>
                </div>
              )}
              <Button onClick={resetSearch} variant="outline" className="w-full">
                <Search className="w-4 h-4 mr-2" />Search Again
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
    </section>
  )
}
