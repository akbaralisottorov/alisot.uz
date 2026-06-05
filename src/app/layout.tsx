import { ReactNode } from "react"
import { ThemeProvider } from "@/components/theme-provider"
import Navigation from "@/components/navigation"
import Footer from "@/components/footer"

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <ThemeProvider>
      <div className="w-full min-h-screen bg-background text-foreground flex flex-col font-sans p-6 gap-6 selection:bg-primary/30 selection:text-foreground">
        <Navigation />
        <main className="flex-1">
          {children}
        </main>
        <Footer />
      </div>
    </ThemeProvider>
  )
}
