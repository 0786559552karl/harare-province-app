'use client'

import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Brain, Sparkles, Loader2, TrendingUp, Users, Home, AlertTriangle } from 'lucide-react'

type Insight = {
  category: string
  title: string
  description: string
  priority: 'high' | 'medium' | 'low'
}

export default function AIInsightsPage() {
  const [insights, setInsights] = useState<Insight[]>([])
  const [loading, setLoading] = useState(false)
  const [generated, setGenerated] = useState(false)

  const generateInsights = async () => {
    setLoading(true)
    try {
      const res = await fetch('/api/admin/ai-insights')
      const data = await res.json()
      setInsights(data.insights || [])
      setGenerated(true)
    } catch {
      setInsights([])
    } finally {
      setLoading(false)
    }
  }

  const priorityColor = (p: string) => {
    if (p === 'high') return 'text-red-600 bg-red-50 border-red-200'
    if (p === 'medium') return 'text-yellow-600 bg-yellow-50 border-yellow-200'
    return 'text-green-600 bg-green-50 border-green-200'
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold flex items-center gap-2">
            <Brain className="w-7 h-7 text-green-700" />
            AI Insights
          </h1>
          <p className="text-muted-foreground">AI-powered analysis of community data</p>
        </div>
        <Button onClick={generateInsights} disabled={loading} className="bg-green-700 hover:bg-green-800">
          {loading ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : <Sparkles className="w-4 h-4 mr-2" />}
          {generated ? 'Regenerate' : 'Generate Insights'}
        </Button>
      </div>

      {!generated && !loading && (
        <Card className="border-dashed">
          <CardContent className="flex flex-col items-center justify-center py-16">
            <Brain className="w-16 h-16 text-muted-foreground mb-4" />
            <h3 className="text-lg font-medium mb-2">Ready to Analyse</h3>
            <p className="text-muted-foreground text-center max-w-md">
              Click Generate Insights to get AI-powered analysis of your community data including demographics, infrastructure gaps, and recommendations.
            </p>
          </CardContent>
        </Card>
      )}

      {loading && (
        <Card>
          <CardContent className="flex flex-col items-center justify-center py-16">
            <Loader2 className="w-12 h-12 animate-spin text-green-700 mb-4" />
            <p className="text-muted-foreground">Analysing community data...</p>
          </CardContent>
        </Card>
      )}

      {generated && !loading && (
        <div className="grid gap-4">
          {insights.length === 0 ? (
            <Card>
              <CardContent className="py-8 text-center">
                <p className="text-muted-foreground">No insights available. Add more member data to enable AI analysis.</p>
              </CardContent>
            </Card>
          ) : (
            insights.map((insight, i) => (
              <Card key={i} className="border-l-4" style={{ borderLeftColor: insight.priority === 'high' ? '#dc2626' : insight.priority === 'medium' ? '#d97706' : '#16a34a' }}>
                <CardHeader className="pb-2">
                  <div className="flex items-start justify-between">
                    <div>
                      <span className="text-xs font-medium text-muted-foreground uppercase tracking-wide">{insight.category}</span>
                      <CardTitle className="text-base mt-1">{insight.title}</CardTitle>
                    </div>
                    <span className={`text-xs px-2 py-1 rounded-full border font-medium ${priorityColor(insight.priority)}`}>
                      {insight.priority}
                    </span>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">{insight.description}</p>
                </CardContent>
              </Card>
            ))
          )}
        </div>
      )}
    </div>
  )
}
