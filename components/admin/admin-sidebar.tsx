"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { LayoutDashboard, Users, UserPlus, BarChart3, FileText, History, Settings, Home, Brain } from "lucide-react"
import { cn } from "@/lib/utils"

const navItems = [
  { title: "Dashboard", href: "/admin", icon: LayoutDashboard },
  { title: "All Members", href: "/admin/members", icon: Users },
  { title: "Register New", href: "/admin/register", icon: UserPlus },
  { title: "Analytics", href: "/admin/analytics", icon: BarChart3 },
  { title: "AI Insights", href: "/admin/ai-insights", icon: Brain, badge: "AI" },
  { title: "Reports", href: "/admin/reports", icon: FileText },
  { title: "Activity Log", href: "/admin/activity", icon: History },
  { title: "Settings", href: "/admin/settings", icon: Settings },
]

export function AdminSidebar() {
  const pathname = usePathname()
  return (
    <aside className="w-64 border-r flex flex-col bg-green-800">
      <div className="p-4 border-b border-green-700">
        <h1 className="font-bold text-yellow-400 text-lg">DISMS AI</h1>
        <p className="text-xs text-green-300">Harare Province Admin</p>
      </div>
      <nav className="flex-1 p-4 space-y-1">
        {navItems.map((item) => {
          const isActive = pathname === item.href
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-colors",
                isActive ? "bg-white/20 text-white font-medium" : "text-white/80 hover:bg-white/10 hover:text-white"
              )}
            >
              <item.icon className="w-5 h-5" />
              <span className="flex-1">{item.title}</span>
              {'badge' in item && item.badge && (
                <span className="px-1.5 py-0.5 text-[10px] font-bold rounded bg-yellow-400 text-black">{item.badge}</span>
              )}
            </Link>
          )
        })}
      </nav>
      <div className="p-4 border-t border-green-700">
        <Link href="/" className="flex items-center gap-3 px-3 py-2 rounded-lg text-sm text-white/80 hover:bg-white/10 hover:text-white transition-colors">
          <Home className="w-5 h-5" />
          Back to Home
        </Link>
      </div>
    </aside>
  )
}
