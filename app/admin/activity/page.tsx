'use client'

import { useEffect, useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Activity, UserPlus, Edit, Trash2, LogIn } from 'lucide-react'

type LogEntry = {
  id: string
  action: string
  details: string
  created_at: string
}

export default function ActivityPage() {
  const [logs, setLogs] = useState<LogEntry[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch('/api/admin/analytics?type=activity')
      .then(r => r.json())
      .then(d => { setLogs(d.logs || []); setLoading(false) })
      .catch(() => setLoading(false))
  }, [])

  const getIcon = (action: string) => {
    if (action.includes('create')) return <UserPlus className="w-4 h-4" />
    if (action.includes('update')) return <Edit className="w-4 h-4" />
    if (action.includes('delete')) return <Trash2 className="w-4 h-4" />
    return <LogIn className="w-4 h-4" />
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Activity Log</h1>
        <p className="text-muted-foreground">System activity and audit trail</p>
      </div>
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Activity className="w-5 h-5" />
            Recent Activity
          </CardTitle>
        </CardHeader>
        <CardContent>
          {loading ? (
            <p className="text-muted-foreground">Loading...</p>
          ) : logs.length === 0 ? (
            <p className="text-muted-foreground">No activity recorded yet.</p>
          ) : (
            <div className="space-y-3">
              {logs.map(log => (
                <div key={log.id} className="flex items-start gap-3 p-3 rounded-lg border">
                  <div className="mt-0.5 text-muted-foreground">{getIcon(log.action)}</div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <Badge variant="outline">{log.action}</Badge>
                      <span className="text-xs text-muted-foreground">
                        {new Date(log.created_at).toLocaleString()}
                      </span>
                    </div>
                    <p className="text-sm mt-1">{log.details}</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
