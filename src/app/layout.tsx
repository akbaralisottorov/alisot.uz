import { ReactNode, useState, useEffect } from "react"
import { ThemeProvider } from "@/components/theme-provider"
import Navigation from "@/components/navigation"
import Footer from "@/components/footer"
import { motion, AnimatePresence } from "motion/react"
import { ArrowUp } from "lucide-react"

export default function Layout({ children }: { children: ReactNode }) {
  const [showScrollTop, setShowScrollTop] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 300)
    }

    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    })
  }

  return (
    <ThemeProvider>
      <div className="w-full min-h-screen bg-background text-foreground flex flex-col font-sans p-6 gap-6 selection:bg-primary/30 selection:text-foreground relative">
        <Navigation />
        <main className="flex-1">
          {children}
        </main>
        <Footer />

        {/* Scroll to Top Button */}
        <AnimatePresence>
          {showScrollTop && (
            <motion.button
              initial={{ opacity: 0, scale: 0.8, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.8, y: 10 }}
              whileHover={{ y: -3, scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={scrollToTop}
              className="fixed bottom-10 right-10 z-50 p-3 bg-card hover:bg-card/90 border border-border/80 text-foreground rounded-full shadow-lg backdrop-blur-md transition-shadow hover:shadow-primary/10 cursor-pointer focus-ring"
              aria-label="Scroll to top"
            >
              <ArrowUp className="w-5 h-5 text-gold" />
            </motion.button>
          )}
        </AnimatePresence>
      </div>
    </ThemeProvider>
  )
}
