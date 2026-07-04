'use client'

import { useEffect, useState } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { ArrowLeft, User, MapPin, Home, Trash2, Loader2 } from 'lucide-react'

export default function MemberDetailPage() {
  const { id } = useParams()
  const router = useRouter()
  const [member, setMember] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [deleting, setDeleting] = useState(false)

  useEffect(() => {
    fetch(`/api/admin/residents/${id}`)
      .then(r => r.json())
      .then(d => { setMember(d); setLoading(false) })
      .catch(() => setLoading(false))
  }, [id])

  const handleDelete = async () => {
    if (!confirm('Delete this member? This cannot be undone.')) return
    setDeleting(true)
    await fetch(`/api/admin/residents/${id}`, { method: 'DELETE' })
    router.push('/admin/members')
  }

  if (loading) return <div className="flex items-center justify-center h-64"><Loader2 className="w-8 h-8 animate-spin" /></div>
  if (!member) return <div className="text-center py-16"><p>Member not found.</p></div>

  const Section = ({ title, icon: Icon, children }: any) => (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-base">
          <Icon className="w-4 h-4 text-green-700" />
          {title}
        </CardTitle>
      </CardHeader>
      <CardContent>{children}</CardContent>
    </Card>
  )

  const Field = ({ label, value }: { label: string; value?: string | null }) =>
    value ? (
      <div className="flex justify-between py-1.5 border-b last:border-b-0">
        <span className="text-sm text-muted-foreground">{label}</span>
        <span className="text-sm font-medium">{value}</span>
      </div>
    ) : null

  return (
    <div className="space-y-6 max-w-4xl">
      <div className="flex items-center justify-between">
        <Button variant="ghost" onClick={() => router.back()}>
          <ArrowLeft className="w-4 h-4 mr-2" /> Back
        </Button>
        <Button variant="destructive" size="sm" onClick={handleDelete} disabled={deleting}>
          {deleting ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : <Trash2 className="w-4 h-4 mr-2" />}
          Delete Member
        </Button>
      </div>

      <div className="flex items-center gap-4 p-4 bg-green-50 rounded-xl border border-green-200">
        <div className="w-14 h-14 rounded-full bg-green-700 flex items-center justify-center">
          <User className="w-7 h-7 text-white" />
        </div>
        <div>
          <h1 className="text-xl font-bold">{member.name} {member.surname}</h1>
          <p className="text-muted-foreground text-sm">PIN/RS: {member.pin_rs} &bull; ID: {member.national_id}</p>
          <Badge className="mt-1">{member.gender === 'M' ? 'Male' : 'Female'}</Badge>
        </div>
      </div>

      <Section title="Location" icon={MapPin}>
        <Field label="Farm" value={member.farm_name} />
        <Field label="Farm Size (Ha)" value={member.farm_size} />
        <Field label="Deed Number" value={member.deed_number} />
        <Field label="Constituency" value={member.constituency} />
        <Field label="Ward" value={member.ward} />
        <Field label="Polling Station" value={member.polling_station} />
        <Field label="District" value={member.district} />
        <Field label="Branch" value={member.branch} />
        <Field label="Cell/Village" value={member.cell_village} />
        <Field label="Farm Ownership" value={member.farm_ownership} />
      </Section>

      <Section title="Beneficiary Details" icon={User}>
        <Field label="Date of Birth" value={member.date_of_birth} />
        <Field label="Contact" value={member.contact_number} />
        <Field label="Marital Status" value={member.marital_status} />
        <Field label="Employment" value={member.employment_status} />
      </Section>

      {member.infrastructure && (
        <Section title="Infrastructure" icon={Home}>
          <Field label="Structure" value={member.infrastructure.erected_structure} />
          <Field label="Rooms" value={member.infrastructure.num_rooms} />
          <Field label="Water" value={member.infrastructure.water_source} />
          <Field label="Lighting" value={member.infrastructure.lighting_source} />
          <Field label="Internet" value={member.infrastructure.internet_hub} />
        </Section>
      )}

      <div className="text-xs text-muted-foreground text-right">
        Registered: {new Date(member.created_at).toLocaleString()}
      </div>
    </div>
  )
}
