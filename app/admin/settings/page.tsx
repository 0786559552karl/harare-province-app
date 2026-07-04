import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Database, Shield, Server } from "lucide-react"

export default function SettingsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-green-800">Settings</h1>
        <p className="text-muted-foreground">System information and configuration</p>
      </div>
      <div className="grid lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader><CardTitle className="flex items-center gap-2"><Server className="w-5 h-5" />System Info</CardTitle></CardHeader>
          <CardContent className="space-y-3">
            {[
              { label: 'Application', value: 'DISMS Communities ZW' },
              { label: 'Province', value: 'Harare' },
              { label: 'Framework', value: 'Next.js 16' },
              { label: 'Database', value: 'Supabase (PostgreSQL)' },
              { label: 'Version', value: '1.0.0' },
            ].map(item => (
              <div key={item.label} className="flex justify-between py-2 border-b last:border-0">
                <span className="text-sm text-muted-foreground">{item.label}</span>
                <span className="text-sm font-medium">{item.value}</span>
              </div>
            ))}
          </CardContent>
        </Card>
        <Card>
          <CardHeader><CardTitle className="flex items-center gap-2"><Shield className="w-5 h-5" />Security</CardTitle></CardHeader>
          <CardContent className="space-y-3">
            {[
              { label: 'Admin Auth', value: 'Cookie Session', ok: true },
              { label: 'RLS Policies', value: 'Enabled', ok: true },
              { label: 'HTTPS', value: 'Production Only', ok: true },
            ].map(item => (
              <div key={item.label} className="flex justify-between py-2 border-b last:border-0">
                <span className="text-sm text-muted-foreground">{item.label}</span>
                <Badge variant={item.ok ? 'default' : 'destructive'} className="bg-green-700">{item.value}</Badge>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
