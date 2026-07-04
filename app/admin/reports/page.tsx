"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { FileText, Download, Loader2, Users, Baby, Home, FileJson } from "lucide-react"

const exportTypes = [
  { value: "residents", label: "Members", icon: Users, description: "All registered members" },
  { value: "children", label: "Children", icon: Baby, description: "All registered children" },
  { value: "spouses", label: "Spouses", icon: Users, description: "All registered spouses" },
  { value: "full", label: "Full Report", icon: FileText, description: "Complete data" },
]

export default function ReportsPage() {
  const [selectedType, setSelectedType] = useState("residents")
  const [format, setFormat] = useState("csv")
  const [loading, setLoading] = useState(false)

  const handleExport = async () => {
    setLoading(true)
    try {
      const response = await fetch(`/api/admin/export?type=${selectedType}&format=${format}`)
      if (!response.ok) throw new Error("Export failed")
      const blob = await response.blob()
      const url = URL.createObjectURL(blob)
      const a = document.createElement("a")
      a.href = url
      a.download = `${selectedType}_export.${format}`
      document.body.appendChild(a)
      a.click()
      document.body.removeChild(a)
      URL.revokeObjectURL(url)
    } catch {
      alert("Export failed.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-green-800">Reports & Export</h1>
        <p className="text-muted-foreground">Generate and download reports</p>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>Export Data</CardTitle>
          <CardDescription>Choose data type and format</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Data Type</label>
              <Select value={selectedType} onValueChange={setSelectedType}>
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>
                  {exportTypes.map(t => (
                    <SelectItem key={t.value} value={t.value}>{t.label}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Format</label>
              <Select value={format} onValueChange={setFormat}>
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="csv">CSV (Excel)</SelectItem>
                  <SelectItem value="json">JSON</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <Button onClick={handleExport} disabled={loading} className="bg-green-700 hover:bg-green-800">
            {loading ? <><Loader2 className="w-4 h-4 mr-2 animate-spin" />Exporting...</> : <><Download className="w-4 h-4 mr-2" />Download {format.toUpperCase()}</>}
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}
