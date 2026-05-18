import { redirect } from 'next/navigation'
import { getCurrentUser } from '@/lib/auth'
import DashboardSidebar from '@/components/dashboard/sidebar'
import DashboardHeader from '@/components/dashboard/header'

export const metadata = {
  title: 'Dashboard - MWASE AI',
  description: 'Generate images and videos with AI',
}

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const user = await getCurrentUser()
  
  if (!user) {
    redirect('/auth/login')
  }

  return (
    <div className="flex h-screen bg-slate-900">
      <DashboardSidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <DashboardHeader user={user} />
        <main className="flex-1 overflow-y-auto">{children}</main>
      </div>
    </div>
  )
}
