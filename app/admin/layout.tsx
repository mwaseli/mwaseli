import { redirect } from 'next/navigation'
import { getCurrentUser, getUserProfile } from '@/lib/auth'
import AdminSidebar from '@/components/admin/sidebar'
import AdminHeader from '@/components/admin/header'

export const metadata = {
  title: 'Admin Dashboard - MWASE AI',
  description: 'Administration panel for MWASE AI Agent',
}

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const user = await getCurrentUser()
  const profile = user ? await getUserProfile(user.id) : null
  
  if (!user || !profile?.is_admin) {
    redirect('/dashboard')
  }

  return (
    <div className="flex h-screen bg-slate-900">
      <AdminSidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <AdminHeader user={user} />
        <main className="flex-1 overflow-y-auto">{children}</main>
      </div>
    </div>
  )
}
