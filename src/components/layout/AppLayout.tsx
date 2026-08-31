import { useEffect } from 'react'
import { useLocation, useOutlet } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import { Navbar } from '@/components/layout/Navbar'
import { Footer } from '@/components/layout/Footer'
import { registerGsapPlugins } from '@/lib/gsap'

export function AppLayout() {
  const location = useLocation()
  const outlet = useOutlet()

  useEffect(() => {
    registerGsapPlugins()
  }, [])

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'auto' })
  }, [location.pathname])

  const isHome = location.pathname === '/'

  return (
    <div className="flex min-h-dvh flex-col bg-void">
      {isHome ? null : <Navbar />}
      <main className="flex-1">
        <AnimatePresence mode="wait">
          <motion.div
            key={location.pathname}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
          >
            {outlet}
          </motion.div>
        </AnimatePresence>
      </main>
      {isHome ? null : <Footer />}
    </div>
  )
}
