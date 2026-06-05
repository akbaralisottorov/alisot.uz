import { ModeToggle } from "./mode-toggle"
import { SemanticSearch } from "./semantic-search"

export default function Navigation() {
  return (
    <header className="sticky top-0 z-50 w-full mb-8">
      <div className="flex items-center justify-between border-b border-border/40 bg-background/80 backdrop-blur-xl px-6 py-4">
        <a href="/" className="font-heading font-bold text-xl text-foreground !decoration-transparent">
          alisot<span className="text-primary">.uz</span>
        </a>
        
        <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-muted-foreground">
          <SemanticSearch />
          <a href="/#projects" className="transition-colors hover:text-primary">Loyihalar</a>
          <a href="/about" className="transition-colors hover:text-primary">About</a>
          <a href="/uses" className="transition-colors hover:text-primary">Uses</a>
          <a href="/books" className="transition-colors hover:text-primary">Kitoblar</a>
          <a href="/garden" className="transition-colors hover:text-primary">Garden</a>
          <div className="h-4 w-px bg-border group-hover:bg-primary/50" />
          <ModeToggle />
        </nav>

        <div className="md:hidden flex items-center gap-4">
          <SemanticSearch />
          <ModeToggle />
        </div>
      </div>
    </header>
  )
}


