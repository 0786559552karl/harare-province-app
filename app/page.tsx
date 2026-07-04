import { IntroAnimation } from '@/components/intro-animation'
import { SearchPortal } from '@/components/search-portal'
import { Footer } from '@/components/footer'
import { AdminAccessButton } from '@/components/admin-access-button'

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col">
      <AdminAccessButton />
      <IntroAnimation />
      <SearchPortal />
      <Footer />
    </main>
  )
}
