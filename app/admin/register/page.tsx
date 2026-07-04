"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Loader2, Save, MapPin, User, Users, Baby, Home,
  Droplets, Zap, Plus, Trash2, BookOpen, Building2, ShoppingBag,
} from "lucide-react"

// Types
interface SubjectGrade { subject: string; symbol: string }
interface TertiaryQual { level: string; detail: string }
interface EducationQuals {
  level: string
  oLevel: SubjectGrade[]
  aLevel: SubjectGrade[]
  tertiary: TertiaryQual[]
}
interface EmploymentDetails {
  status: string; occupation: string; employerName: string
  employerContact: string; employerAddress: string; salary: string
  businessType: string; businessRegistered: string
  companyName: string; regNumber: string
  businessAddress: string; businessContact: string
}
interface PersonDetails {
  pin_rs: string; name: string; surname: string; idNo: string
  dob: string; gender: string; contact: string; maritalStatus: string
  employment: EmploymentDetails; education: EducationQuals
}
interface ChildDetails extends PersonDetails {
  currentLevel: string; currentLevelDetail: string; pastQuals: EducationQuals
}
type DependantDetails = ChildDetails
interface SchoolInfo { available: string; name: string; registered: string; distance: string }

// Helpers
const emptyEmployment = (): EmploymentDetails => ({
  status: "", occupation: "", employerName: "", employerContact: "",
  employerAddress: "", salary: "", businessType: "", businessRegistered: "",
  companyName: "", regNumber: "", businessAddress: "", businessContact: "",
})
const emptyEducation = (): EducationQuals => ({
  level: "",
  oLevel: [{ subject: "", symbol: "" }],
  aLevel: [{ subject: "", symbol: "" }],
  tertiary: [{ level: "", detail: "" }],
})
const emptyPerson = (): PersonDetails => ({
  pin_rs: "", name: "", surname: "", idNo: "", dob: "", gender: "",
  contact: "", maritalStatus: "",
  employment: emptyEmployment(), education: emptyEducation(),
})
const emptyChild = (): ChildDetails => ({
  ...emptyPerson(), currentLevel: "", currentLevelDetail: "", pastQuals: emptyEducation(),
})
const emptyDependant = (): DependantDetails => ({ ...emptyChild() })
const emptySchool = (): SchoolInfo => ({ available: "", name: "", registered: "", distance: "" })

// Toggle Button Component
function ToggleButton({ value, current, onClick }: { value: string; current: string; onClick: (v: string) => void }) {
  const active = current === value
  return (
    <button
      type="button"
      onClick={() => onClick(active ? "" : value)}
      className={`px-3 py-1.5 rounded-full text-sm border transition-all ${
        active
          ? "bg-green-700 text-white border-green-700 font-medium"
          : "bg-white text-gray-700 border-gray-300 hover:border-green-500"
      }`}
    >
      {value}
    </button>
  )
}

// Employment Section
function EmploymentSection({ emp, onChange }: { emp: EmploymentDetails; onChange: (v: EmploymentDetails) => void }) {
  const set = (k: keyof EmploymentDetails, v: string) => onChange({ ...emp, [k]: v })
  return (
    <div className="space-y-3">
      <Label>Employment Status</Label>
      <div className="flex flex-wrap gap-2">
        {["Employed", "Self Employed", "Unemployed"].map(s => (
          <ToggleButton key={s} value={s} current={emp.status} onClick={v => set("status", v)} />
        ))}
      </div>
      {emp.status === "Employed" && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-3 p-3 bg-gray-50 rounded-lg">
          <div><Label>Occupation</Label><Input value={emp.occupation} onChange={e => set("occupation", e.target.value)} /></div>
          <div><Label>Employer Name</Label><Input value={emp.employerName} onChange={e => set("employerName", e.target.value)} /></div>
          <div><Label>Employer Contact</Label><Input value={emp.employerContact} onChange={e => set("employerContact", e.target.value)} /></div>
          <div><Label>Employer Address</Label><Input value={emp.employerAddress} onChange={e => set("employerAddress", e.target.value)} /></div>
          <div className="md:col-span-2">
            <Label>Salary Range</Label>
            <div className="flex flex-wrap gap-2 mt-1">
              {["Below 100", "100 - 200", "200 - 300", "300 - 400", "400+"].map(s => (
                <ToggleButton key={s} value={s} current={emp.salary} onClick={v => set("salary", v)} />
              ))}
            </div>
          </div>
        </div>
      )}
      {emp.status === "Self Employed" && (
        <div className="space-y-3 p-3 bg-gray-50 rounded-lg">
          <div><Label>Type of Business</Label><Input value={emp.businessType} onChange={e => set("businessType", e.target.value)} /></div>
          <div>
            <Label>Registration Status</Label>
            <div className="flex gap-2 mt-1">
              {["Registered", "Unregistered"].map(s => (
                <ToggleButton key={s} value={s} current={emp.businessRegistered} onClick={v => set("businessRegistered", v)} />
              ))}
            </div>
          </div>
          {emp.businessRegistered === "Registered" && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <div><Label>Company Name</Label><Input value={emp.companyName} onChange={e => set("companyName", e.target.value)} /></div>
              <div><Label>Registration No.</Label><Input value={emp.regNumber} onChange={e => set("regNumber", e.target.value)} /></div>
              <div><Label>Address</Label><Input value={emp.businessAddress} onChange={e => set("businessAddress", e.target.value)} /></div>
              <div><Label>Contact</Label><Input value={emp.businessContact} onChange={e => set("businessContact", e.target.value)} /></div>
            </div>
          )}
        </div>
      )}
    </div>
  )
}

// Education Section
function EducationSection({ edu, onChange }: { edu: EducationQuals; onChange: (v: EducationQuals) => void }) {
  const set = (k: keyof EducationQuals, v: any) => onChange({ ...edu, [k]: v })
  const tertiaryLevels = ["Certificate", "Diploma", "Degree", "Masters", "Doctorate", "Professor"]
  return (
    <div className="space-y-3">
      <Label>Education Qualifications</Label>
      <div className="flex flex-wrap gap-2">
        {["None", "O'Level", "A'Level", "Tertiary"].map(l => (
          <ToggleButton key={l} value={l} current={edu.level} onClick={v => set("level", v)} />
        ))}
      </div>
      {(edu.level === "O'Level" || edu.level === "A'Level" || edu.level === "Tertiary") && (
        <div className="space-y-3 p-3 bg-gray-50 rounded-lg">
          {(edu.level === "O'Level" || edu.level === "Tertiary") && (
            <div>
              <Label className="text-xs font-semibold uppercase text-gray-500">O'Level Subjects</Label>
              {edu.oLevel.map((s, i) => (
                <div key={i} className="flex gap-2 mt-1">
                  <Input placeholder="Subject" value={s.subject} onChange={e => { const n=[...edu.oLevel]; n[i]={...n[i],subject:e.target.value}; set("oLevel",n) }} />
                  <Input placeholder="Symbol" className="w-24" value={s.symbol} onChange={e => { const n=[...edu.oLevel]; n[i]={...n[i],symbol:e.target.value}; set("oLevel",n) }} />
                  {i>0 && <Button type="button" size="sm" variant="ghost" onClick={() => set("oLevel", edu.oLevel.filter((_,j)=>j!==i))}><Trash2 className="w-4 h-4" /></Button>}
                </div>
              ))}
              <Button type="button" size="sm" variant="outline" className="mt-1" onClick={() => set("oLevel",[...edu.oLevel,{subject:"",symbol:""}])}><Plus className="w-3 h-3 mr-1" />Add Subject</Button>
            </div>
          )}
          {(edu.level === "A'Level" || edu.level === "Tertiary") && (
            <div>
              <Label className="text-xs font-semibold uppercase text-gray-500">A'Level Subjects</Label>
              {edu.aLevel.map((s, i) => (
                <div key={i} className="flex gap-2 mt-1">
                  <Input placeholder="Subject" value={s.subject} onChange={e => { const n=[...edu.aLevel]; n[i]={...n[i],subject:e.target.value}; set("aLevel",n) }} />
                  <Input placeholder="Symbol" className="w-24" value={s.symbol} onChange={e => { const n=[...edu.aLevel]; n[i]={...n[i],symbol:e.target.value}; set("aLevel",n) }} />
                  {i>0 && <Button type="button" size="sm" variant="ghost" onClick={() => set("aLevel", edu.aLevel.filter((_,j)=>j!==i))}><Trash2 className="w-4 h-4" /></Button>}
                </div>
              ))}
              <Button type="button" size="sm" variant="outline" className="mt-1" onClick={() => set("aLevel",[...edu.aLevel,{subject:"",symbol:""}])}><Plus className="w-3 h-3 mr-1" />Add Subject</Button>
            </div>
          )}
          {edu.level === "Tertiary" && (
            <div>
              <Label className="text-xs font-semibold uppercase text-gray-500">Tertiary Qualifications</Label>
              {edu.tertiary.map((t, i) => (
                <div key={i} className="flex gap-2 mt-1">
                  <div className="flex flex-wrap gap-1">
                    {tertiaryLevels.map(l => (
                      <ToggleButton key={l} value={l} current={t.level} onClick={v => { const n=[...edu.tertiary]; n[i]={...n[i],level:v}; set("tertiary",n) }} />
                    ))}
                  </div>
                  <Input placeholder="Details" value={t.detail} onChange={e => { const n=[...edu.tertiary]; n[i]={...n[i],detail:e.target.value}; set("tertiary",n) }} />
                  {i>0 && <Button type="button" size="sm" variant="ghost" onClick={() => set("tertiary", edu.tertiary.filter((_,j)=>j!==i))}><Trash2 className="w-4 h-4" /></Button>}
                </div>
              ))}
              <Button type="button" size="sm" variant="outline" className="mt-1" onClick={() => set("tertiary",[...edu.tertiary,{level:"",detail:""}])}><Plus className="w-3 h-3 mr-1" />Add Qualification</Button>
            </div>
          )}
        </div>
      )}
    </div>
  )
}

// Person Section (Beneficiary, Spouse)
function PersonSection({ person, onChange, title, icon: Icon }: {
  person: PersonDetails; onChange: (p: PersonDetails) => void
  title: string; icon: any
}) {
  const set = (k: keyof PersonDetails, v: any) => onChange({ ...person, [k]: v })
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Icon className="w-5 h-5 text-green-700" />{title}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div><Label>PIN / RS</Label><Input value={person.pin_rs} onChange={e => set("pin_rs", e.target.value)} /></div>
          <div><Label>Name *</Label><Input required value={person.name} onChange={e => set("name", e.target.value)} /></div>
          <div><Label>Surname *</Label><Input required value={person.surname} onChange={e => set("surname", e.target.value)} /></div>
          <div><Label>ID Number</Label><Input value={person.idNo} onChange={e => set("idNo", e.target.value)} /></div>
          <div><Label>Date of Birth</Label><Input type="date" value={person.dob} onChange={e => set("dob", e.target.value)} /></div>
          <div><Label>Contact Number</Label><Input value={person.contact} onChange={e => set("contact", e.target.value)} /></div>
        </div>
        <div>
          <Label>Gender</Label>
          <div className="flex gap-2 mt-1">
            <ToggleButton value="M" current={person.gender} onClick={v => set("gender", v)} />
            <ToggleButton value="F" current={person.gender} onClick={v => set("gender", v)} />
          </div>
        </div>
        <div>
          <Label>Marital Status</Label>
          <div className="flex flex-wrap gap-2 mt-1">
            {["Single","Divorced","Widow","Widower","Married","Deceased"].map(s => (
              <ToggleButton key={s} value={s} current={person.maritalStatus} onClick={v => set("maritalStatus", v)} />
            ))}
          </div>
        </div>
        <EmploymentSection emp={person.employment} onChange={v => set("employment", v)} />
        <EducationSection edu={person.education} onChange={v => set("education", v)} />
      </CardContent>
    </Card>
  )
}

// Child Level Section
function ChildLevelSection({ child, onChange }: { child: ChildDetails; onChange: (c: ChildDetails) => void }) {
  const set = (k: keyof ChildDetails, v: any) => onChange({ ...child, [k]: v })
  const isPastForm4 = ["Secondary (Form 4)", "Tertiary"].includes(child.currentLevel) || child.currentLevel === ""
  return (
    <div className="space-y-3">
      <Label>Current Educational Level</Label>
      <div className="space-y-2">
        <p className="text-xs text-muted-foreground font-semibold uppercase">Pre School</p>
        <div className="flex flex-wrap gap-2">
          {["ECD A","ECD B"].map(l => <ToggleButton key={l} value={l} current={child.currentLevel} onClick={v => set("currentLevel",v)} />)}
        </div>
        <p className="text-xs text-muted-foreground font-semibold uppercase">Primary (Grade)</p>
        <div className="flex flex-wrap gap-2">
          {["Grade 1","Grade 2","Grade 3","Grade 4","Grade 5","Grade 6","Grade 7"].map(l => <ToggleButton key={l} value={l} current={child.currentLevel} onClick={v => set("currentLevel",v)} />)}
        </div>
        <p className="text-xs text-muted-foreground font-semibold uppercase">Secondary (Form)</p>
        <div className="flex flex-wrap gap-2">
          {["Form 1","Form 2","Form 3","Form 4"].map(l => <ToggleButton key={l} value={l} current={child.currentLevel} onClick={v => set("currentLevel",v)} />)}
        </div>
        <p className="text-xs text-muted-foreground font-semibold uppercase">Tertiary</p>
        <div className="flex flex-wrap gap-2">
          {["Certificate","Diploma","Degree","Masters","Doctorate","Professor"].map(l => <ToggleButton key={l} value={l} current={child.currentLevel} onClick={v => set("currentLevel",v)} />)}
        </div>
        {child.currentLevel && ["Certificate","Diploma","Degree","Masters","Doctorate","Professor"].includes(child.currentLevel) && (
          <Input placeholder="e.g. Certificate in ICT" value={child.currentLevelDetail} onChange={e => set("currentLevelDetail", e.target.value)} />
        )}
      </div>
      {(isPastForm4 || child.currentLevel.startsWith("Form") && parseInt(child.currentLevel.replace("Form ","")) >= 4) && (
        <div className="mt-3 p-3 bg-blue-50 rounded-lg">
          <p className="text-xs font-semibold text-blue-800 mb-2">Past Qualifications (if no longer in school)</p>
          <EducationSection edu={child.pastQuals} onChange={v => set("pastQuals", v)} />
        </div>
      )}
    </div>
  )
}

// School Block for Education Infrastructure
function SchoolBlock({ label, info, onChange }: { label: string; info: SchoolInfo; onChange: (s: SchoolInfo) => void }) {
  return (
    <div className="space-y-2 p-3 border rounded-lg">
      <Label className="font-semibold">{label}</Label>
      <div className="flex gap-2">
        {["None","Available"].map(v => <ToggleButton key={v} value={v} current={info.available} onClick={s => onChange({...info, available: s})} />)}
      </div>
      {info.available === "Available" && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mt-2">
          <div><Label>Name</Label><Input value={info.name} onChange={e => onChange({...info, name: e.target.value})} /></div>
          <div>
            <Label>Status</Label>
            <div className="flex gap-2 mt-1">
              {["Registered","Not Registered"].map(v => <ToggleButton key={v} value={v} current={info.registered} onClick={s => onChange({...info, registered: s})} />)}
            </div>
          </div>
          <div><Label>Distance</Label><Input placeholder="e.g. 2km" value={info.distance} onChange={e => onChange({...info, distance: e.target.value})} /></div>
        </div>
      )}
    </div>
  )
}

// Constants
const farmNames = ["Chulu","A of the Rest","Saturday Retreat","Langford Estate","Orbar Farm","Stoneridge","Hopley Farm","Eyrecourt","Eyrestone","Retreat Farm","Woodford Farm","Goddervery","Lyndhurst Farm","Arlington Farm","Delapaise Farm"]
const constituencies = ["Churu","Harare South","Hunyani"]
const wards = ["1","3epw","6","8","12","35"]
const cellVillages = ["1","2","3","4","5","6","7","8","9"]
const organTypes = ["Cooperative","Developer","Pay Scheme","Association","Company","Land Owner","Organisation","Individual"]
const structureTypes = ["None","Cabin","Cottage","Main House"]
const waterSources = ["None","Well","Borehole","Municipal Water"]
const accessibilityTypes = ["Tarred Road","Graveled Road","Access Road","Foot Path","None"]
const wasteDisposalTypes = ["Municipal","Septic","Pit Latrine","None"]
const refuseDisposalTypes = ["Pit","Municipal"]
const lightingSources = ["ZESA","Solar System","None"]
const internetOptions = ["None","Available"]
const healthProviders = ["State Hospital","Municipal Clinic","Private Clinic","None"]
const basicGoodsSources = ["None","Vendors","Tuck Shops","Registered Stores","Abattoir"]
const religions = ["African Tradition","Christianity","Islam","Judaism","Hinduism","Buddhism","Rastafarianism","None"]

// Main Page
export default function RegisterPage() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)

  // A. Location
  const [farmName, setFarmName] = useState("")
  const [farmSize, setFarmSize] = useState("")
  const [deedNumber, setDeedNumber] = useState("")
  const [constituency, setConstituency] = useState("")
  const [ward, setWard] = useState("")
  const [pollingStation, setPollingStation] = useState("")
  const [district, setDistrict] = useState("")
  const [branch, setBranch] = useState("")
  const [cellVillage, setCellVillage] = useState("")
  // B
  const [farmOwnership, setFarmOwnership] = useState("")
  // C
  const [allocatorType, setAllocatorType] = useState("")
  const [allocatorName, setAllocatorName] = useState("")
  const [amountPaid, setAmountPaid] = useState("")
  // D
  const [devInitiator, setDevInitiator] = useState("")
  const [developerName, setDeveloperName] = useState("")
  const [devAmount, setDevAmount] = useState("")
  const [devDone, setDevDone] = useState("")
  // E
  const [adminOrgan, setAdminOrgan] = useState("")
  const [adminName, setAdminName] = useState("")
  // F Beneficiary
  const [beneficiary, setBeneficiary] = useState<PersonDetails>(emptyPerson())
  // Spouse
  const [spouse, setSpouse] = useState<PersonDetails>(emptyPerson())
  // Children
  const [children, setChildren] = useState<ChildDetails[]>([])
  // Dependants
  const [dependants, setDependants] = useState<DependantDetails[]>([])
  // G Infrastructure
  const [erectedStructure, setErectedStructure] = useState("")
  const [numRooms, setNumRooms] = useState("")
  const [waterSource, setWaterSource] = useState("")
  const [accessibility, setAccessibility] = useState("")
  const [wasteDisposal, setWasteDisposal] = useState("")
  const [refuseDisposal, setRefuseDisposal] = useState("")
  const [lighting, setLighting] = useState("")
  const [internetHub, setInternetHub] = useState("")
  const [internetDistance, setInternetDistance] = useState("")
  // I Education Infrastructure
  const [ecdSchool, setEcdSchool] = useState<SchoolInfo>(emptySchool())
  const [primarySchool, setPrimarySchool] = useState<SchoolInfo>(emptySchool())
  const [secondarySchool, setSecondarySchool] = useState<SchoolInfo>(emptySchool())
  const [aLevelSchool, setALevelSchool] = useState<SchoolInfo>(emptySchool())
  const [tertiarySchool, setTertiarySchool] = useState<SchoolInfo>(emptySchool())
  // J-L
  const [healthProvider, setHealthProvider] = useState("")
  const [basicGoodsSource, setBasicGoodsSource] = useState("")
  const [religion, setReligion] = useState("")
  const [churchName, setChurchName] = useState("")

  const addChild = () => setChildren(c => [...c, emptyChild()])
  const updateChild = (i: number, c: ChildDetails) => setChildren(arr => arr.map((x, j) => j === i ? c : x))
  const removeChild = (i: number) => setChildren(arr => arr.filter((_, j) => j !== i))

  const addDependant = () => setDependants(d => [...d, emptyDependant()])
  const updateDependant = (i: number, d: DependantDetails) => setDependants(arr => arr.map((x, j) => j === i ? d : x))
  const removeDependant = (i: number) => setDependants(arr => arr.filter((_, j) => j !== i))

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    try {
      const payload = {
        pin_rs: beneficiary.pin_rs,
        name: beneficiary.name,
        surname: beneficiary.surname,
        national_id: beneficiary.idNo,
        date_of_birth: beneficiary.dob,
        gender: beneficiary.gender,
        contact_number: beneficiary.contact,
        marital_status: beneficiary.maritalStatus,
        employment_status: beneficiary.employment.status,
        occupation: beneficiary.employment.occupation,
        employer_name: beneficiary.employment.employerName,
        salary_range: beneficiary.employment.salary,
        education_level: beneficiary.education.level,
        farm_name: farmName,
        farm_size: farmSize,
        deed_number: deedNumber,
        constituency,
        ward,
        polling_station: pollingStation,
        district,
        branch,
        cell_village: cellVillage,
        farm_ownership: farmOwnership,
        allocator_type: allocatorType,
        allocator_name: allocatorName,
        allocation_amount: amountPaid,
        development_initiator: devInitiator,
        developer_name: developerName,
        development_amount: devAmount,
        development_done: devDone,
        admin_organ: adminOrgan,
        admin_name: adminName,
        religion,
        church_name: churchName,
        basic_goods_source: basicGoodsSource,
        health_provider: healthProvider,
      }
      const res = await fetch("/api/admin/residents", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      })
      if (!res.ok) throw new Error("Registration failed")
      router.push("/admin/members")
    } catch (err) {
      alert("Registration failed. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="max-w-5xl mx-auto space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-green-800">Register New Member</h1>
        <p className="text-muted-foreground">HARARE PROVINCE — Complete all applicable sections</p>
      </div>

      <form onSubmit={handleSubmit}>
        <Tabs defaultValue="location" className="space-y-6">
          <TabsList className="flex flex-wrap h-auto gap-1 bg-muted p-1">
            <TabsTrigger value="location">A–E Location</TabsTrigger>
            <TabsTrigger value="beneficiary">F Beneficiary</TabsTrigger>
            <TabsTrigger value="spouse">Spouse</TabsTrigger>
            <TabsTrigger value="children">Children</TabsTrigger>
            <TabsTrigger value="dependants">Dependants</TabsTrigger>
            <TabsTrigger value="infrastructure">G Infrastructure</TabsTrigger>
            <TabsTrigger value="education_infra">I Edu. Infra</TabsTrigger>
            <TabsTrigger value="community">J–L Community</TabsTrigger>
          </TabsList>

          {/* A–E Location */}
          <TabsContent value="location" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MapPin className="w-5 h-5 text-green-700" />A. Location — HARARE PROVINCE
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <Label>Name of Farm *</Label>
                  <div className="flex flex-wrap gap-2">
                    {farmNames.map(f => <ToggleButton key={f} value={f} current={farmName} onClick={setFarmName} />)}
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div><Label>Farm Size (Ha)</Label><Input placeholder="e.g. 2.5" value={farmSize} onChange={e => setFarmSize(e.target.value)} /></div>
                  <div><Label>Deed Number</Label><Input value={deedNumber} onChange={e => setDeedNumber(e.target.value)} /></div>
                </div>
                <div className="space-y-2">
                  <Label>Constituency</Label>
                  <div className="flex flex-wrap gap-2">
                    {constituencies.map(c => <ToggleButton key={c} value={c} current={constituency} onClick={setConstituency} />)}
                  </div>
                </div>
                <div className="space-y-2">
                  <Label>Ward</Label>
                  <div className="flex flex-wrap gap-2">
                    {wards.map(w => <ToggleButton key={w} value={w} current={ward} onClick={setWard} />)}
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div><Label>Polling Station</Label><Input value={pollingStation} onChange={e => setPollingStation(e.target.value)} /></div>
                  <div><Label>District</Label><Input value={district} onChange={e => setDistrict(e.target.value)} /></div>
                  <div><Label>Branch</Label><Input value={branch} onChange={e => setBranch(e.target.value)} /></div>
                </div>
                <div className="space-y-2">
                  <Label>Cell / Village</Label>
                  <div className="flex flex-wrap gap-2">
                    {cellVillages.map(v => <ToggleButton key={v} value={v} current={cellVillage} onClick={setCellVillage} />)}
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader><CardTitle>B. Farm Ownership</CardTitle></CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {["State","Council","Private","Disputed"].map(o => <ToggleButton key={o} value={o} current={farmOwnership} onClick={setFarmOwnership} />)}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader><CardTitle>C. Allocation History</CardTitle></CardHeader>
              <CardContent className="space-y-4">
                <div><Label>Allocator Type</Label><div className="flex flex-wrap gap-2 mt-1">{organTypes.map(o => <ToggleButton key={o} value={o} current={allocatorType} onClick={setAllocatorType} />)}</div></div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div><Label>Name of Allocator</Label><Input value={allocatorName} onChange={e => setAllocatorName(e.target.value)} /></div>
                  <div><Label>Amount Paid</Label><Input value={amountPaid} onChange={e => setAmountPaid(e.target.value)} /></div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader><CardTitle>D. Development History</CardTitle></CardHeader>
              <CardContent className="space-y-4">
                <div><Label>Development Initiator</Label><div className="flex flex-wrap gap-2 mt-1">{organTypes.map(o => <ToggleButton key={o} value={o} current={devInitiator} onClick={setDevInitiator} />)}</div></div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div><Label>Name of Developer</Label><Input value={developerName} onChange={e => setDeveloperName(e.target.value)} /></div>
                  <div><Label>Amount Paid</Label><Input value={devAmount} onChange={e => setDevAmount(e.target.value)} /></div>
                </div>
                <div><Label>Development Done</Label><div className="flex flex-wrap gap-2 mt-1">{["None","Partially","Yes"].map(d => <ToggleButton key={d} value={d} current={devDone} onClick={setDevDone} />)}</div></div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader><CardTitle>E. Current Administration</CardTitle></CardHeader>
              <CardContent className="space-y-4">
                <div><Label>Organ</Label><div className="flex flex-wrap gap-2 mt-1">{organTypes.map(o => <ToggleButton key={o} value={o} current={adminOrgan} onClick={setAdminOrgan} />)}</div></div>
                <div><Label>Name of Administrator</Label><Input value={adminName} onChange={e => setAdminName(e.target.value)} /></div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* F Beneficiary */}
          <TabsContent value="beneficiary">
            <PersonSection person={beneficiary} onChange={setBeneficiary} title="F. Beneficiary Details" icon={User} />
          </TabsContent>

          {/* Spouse */}
          <TabsContent value="spouse">
            <PersonSection person={spouse} onChange={setSpouse} title="Spouse Details" icon={Users} />
          </TabsContent>

          {/* Children */}
          <TabsContent value="children" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <span className="flex items-center gap-2"><Baby className="w-5 h-5 text-green-700" />Children</span>
                  <Button type="button" size="sm" onClick={addChild} className="bg-green-700">
                    <Plus className="w-4 h-4 mr-1" />Add Child
                  </Button>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {children.length === 0 && <p className="text-muted-foreground text-sm">No children added yet.</p>}
                {children.map((child, i) => (
                  <div key={i} className="p-4 border rounded-xl space-y-4">
                    <div className="flex items-center justify-between">
                      <h4 className="font-semibold">Child {i + 1}</h4>
                      <Button type="button" size="sm" variant="destructive" onClick={() => removeChild(i)}><Trash2 className="w-4 h-4" /></Button>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div><Label>Name</Label><Input value={child.name} onChange={e => updateChild(i, {...child, name: e.target.value})} /></div>
                      <div><Label>Surname</Label><Input value={child.surname} onChange={e => updateChild(i, {...child, surname: e.target.value})} /></div>
                      <div><Label>ID Number</Label><Input value={child.idNo} onChange={e => updateChild(i, {...child, idNo: e.target.value})} /></div>
                      <div><Label>Date of Birth</Label><Input type="date" value={child.dob} onChange={e => updateChild(i, {...child, dob: e.target.value})} /></div>
                      <div><Label>Contact</Label><Input value={child.contact} onChange={e => updateChild(i, {...child, contact: e.target.value})} /></div>
                    </div>
                    <div><Label>Gender</Label><div className="flex gap-2 mt-1">
                      <ToggleButton value="M" current={child.gender} onClick={v => updateChild(i, {...child, gender: v})} />
                      <ToggleButton value="F" current={child.gender} onClick={v => updateChild(i, {...child, gender: v})} />
                    </div></div>
                    <ChildLevelSection child={child} onChange={c => updateChild(i, c)} />
                    <div><Label>Marital Status</Label><div className="flex flex-wrap gap-2 mt-1">
                      {["Single","Divorced","Widow","Widower","Married","Deceased"].map(s => <ToggleButton key={s} value={s} current={child.maritalStatus} onClick={v => updateChild(i, {...child, maritalStatus: v})} />)}
                    </div></div>
                    <EmploymentSection emp={child.employment} onChange={v => updateChild(i, {...child, employment: v})} />
                  </div>
                ))}
              </CardContent>
            </Card>
          </TabsContent>

          {/* Dependants */}
          <TabsContent value="dependants" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <span className="flex items-center gap-2"><Users className="w-5 h-5 text-green-700" />Dependants</span>
                  <Button type="button" size="sm" onClick={addDependant} className="bg-green-700">
                    <Plus className="w-4 h-4 mr-1" />Add Dependant
                  </Button>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {dependants.length === 0 && <p className="text-muted-foreground text-sm">No dependants added yet.</p>}
                {dependants.map((dep, i) => (
                  <div key={i} className="p-4 border rounded-xl space-y-4">
                    <div className="flex items-center justify-between">
                      <h4 className="font-semibold">Dependant {i + 1}</h4>
                      <Button type="button" size="sm" variant="destructive" onClick={() => removeDependant(i)}><Trash2 className="w-4 h-4" /></Button>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div><Label>Name</Label><Input value={dep.name} onChange={e => updateDependant(i, {...dep, name: e.target.value})} /></div>
                      <div><Label>Surname</Label><Input value={dep.surname} onChange={e => updateDependant(i, {...dep, surname: e.target.value})} /></div>
                      <div><Label>ID Number</Label><Input value={dep.idNo} onChange={e => updateDependant(i, {...dep, idNo: e.target.value})} /></div>
                      <div><Label>Date of Birth</Label><Input type="date" value={dep.dob} onChange={e => updateDependant(i, {...dep, dob: e.target.value})} /></div>
                      <div><Label>Contact</Label><Input value={dep.contact} onChange={e => updateDependant(i, {...dep, contact: e.target.value})} /></div>
                    </div>
                    <div><Label>Gender</Label><div className="flex gap-2 mt-1">
                      <ToggleButton value="M" current={dep.gender} onClick={v => updateDependant(i, {...dep, gender: v})} />
                      <ToggleButton value="F" current={dep.gender} onClick={v => updateDependant(i, {...dep, gender: v})} />
                    </div></div>
                    <ChildLevelSection child={dep as ChildDetails} onChange={c => updateDependant(i, c as DependantDetails)} />
                    <div><Label>Marital Status</Label><div className="flex flex-wrap gap-2 mt-1">
                      {["Single","Divorced","Widow","Widower","Married","Deceased"].map(s => <ToggleButton key={s} value={s} current={dep.maritalStatus} onClick={v => updateDependant(i, {...dep, maritalStatus: v})} />)}
                    </div></div>
                    <EmploymentSection emp={dep.employment} onChange={v => updateDependant(i, {...dep, employment: v})} />
                  </div>
                ))}
              </CardContent>
            </Card>
          </TabsContent>

          {/* G Infrastructure */}
          <TabsContent value="infrastructure" className="space-y-6">
            <Card>
              <CardHeader><CardTitle className="flex items-center gap-2"><Building2 className="w-5 h-5 text-green-700" />G. State of Development (Infrastructure)</CardTitle></CardHeader>
              <CardContent className="space-y-6">
                <div><Label>Erected Structure</Label><div className="flex flex-wrap gap-2 mt-1">{structureTypes.map(s => <ToggleButton key={s} value={s} current={erectedStructure} onClick={setErectedStructure} />)}</div></div>
                <div><Label>No. of Rooms</Label><div className="flex flex-wrap gap-2 mt-1">{Array.from({length:12},(_,i)=>String(i+1)).map(n => <ToggleButton key={n} value={n} current={numRooms} onClick={setNumRooms} />)}</div></div>
                <div><Label>Source of Water</Label><div className="flex flex-wrap gap-2 mt-1">{waterSources.map(s => <ToggleButton key={s} value={s} current={waterSource} onClick={setWaterSource} />)}</div></div>
                <div><Label>Accessibility</Label><div className="flex flex-wrap gap-2 mt-1">{accessibilityTypes.map(a => <ToggleButton key={a} value={a} current={accessibility} onClick={setAccessibility} />)}</div></div>
                <div><Label>Waste Disposal System</Label><div className="flex flex-wrap gap-2 mt-1">{wasteDisposalTypes.map(w => <ToggleButton key={w} value={w} current={wasteDisposal} onClick={setWasteDisposal} />)}</div></div>
                <div><Label>Refuse Disposal System</Label><div className="flex flex-wrap gap-2 mt-1">{refuseDisposalTypes.map(r => <ToggleButton key={r} value={r} current={refuseDisposal} onClick={setRefuseDisposal} />)}</div></div>
                <div><Label>Source of Lighting</Label><div className="flex flex-wrap gap-2 mt-1">{lightingSources.map(l => <ToggleButton key={l} value={l} current={lighting} onClick={setLighting} />)}</div></div>
                <div>
                  <Label>Internet Hub</Label><div className="flex flex-wrap gap-2 mt-1">{internetOptions.map(o => <ToggleButton key={o} value={o} current={internetHub} onClick={setInternetHub} />)}</div>
                  {internetHub === "Available" && <div className="mt-2"><Label>Distance from Internet Hub</Label><Input placeholder="e.g. 500m" value={internetDistance} onChange={e => setInternetDistance(e.target.value)} /></div>}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* I Education Infrastructure */}
          <TabsContent value="education_infra" className="space-y-6">
            <Card>
              <CardHeader><CardTitle className="flex items-center gap-2"><BookOpen className="w-5 h-5 text-green-700" />I. Education Infrastructure (Local)</CardTitle></CardHeader>
              <CardContent className="space-y-4">
                <SchoolBlock label="Early Childhood Education (ECD)" info={ecdSchool} onChange={setEcdSchool} />
                <SchoolBlock label="Primary School" info={primarySchool} onChange={setPrimarySchool} />
                <SchoolBlock label="Secondary School" info={secondarySchool} onChange={setSecondarySchool} />
                <SchoolBlock label="Advanced Level School" info={aLevelSchool} onChange={setALevelSchool} />
                <SchoolBlock label="Tertiary School" info={tertiarySchool} onChange={setTertiarySchool} />
              </CardContent>
            </Card>
          </TabsContent>

          {/* J–L Community */}
          <TabsContent value="community" className="space-y-6">
            <Card>
              <CardHeader><CardTitle>J. Health Infrastructure</CardTitle></CardHeader>
              <CardContent><div className="flex flex-wrap gap-2">{healthProviders.map(h => <ToggleButton key={h} value={h} current={healthProvider} onClick={setHealthProvider} />)}</div></CardContent>
            </Card>
            <Card>
              <CardHeader><CardTitle className="flex items-center gap-2"><ShoppingBag className="w-5 h-5 text-green-700" />K. Source of Basic Goods</CardTitle></CardHeader>
              <CardContent><div className="flex flex-wrap gap-2">{basicGoodsSources.map(s => <ToggleButton key={s} value={s} current={basicGoodsSource} onClick={setBasicGoodsSource} />)}</div></CardContent>
            </Card>
            <Card>
              <CardHeader><CardTitle>L. Religion</CardTitle></CardHeader>
              <CardContent className="space-y-3">
                <div className="flex flex-wrap gap-2">{religions.map(r => <ToggleButton key={r} value={r} current={religion} onClick={setReligion} />)}</div>
                {religion === "Christianity" && (
                  <div><Label>Name of Church</Label><Input placeholder="e.g. ZAOGA" value={churchName} onChange={e => setChurchName(e.target.value)} /></div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        <div className="flex items-center justify-between mt-6 pt-6 border-t">
          <p className="text-sm text-muted-foreground">* Required fields</p>
          <Button type="submit" disabled={loading} className="min-w-[200px] bg-green-700 hover:bg-green-800 text-white">
            {loading ? <><Loader2 className="w-4 h-4 mr-2 animate-spin" />Registering...</> : <><Save className="w-4 h-4 mr-2" />Register Member</>}
          </Button>
        </div>
      </form>
    </div>
  )
}
