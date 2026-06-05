import { useState, useEffect } from "react"
import { Search, Loader2 } from "lucide-react"
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command"
import { Badge } from "@/components/ui/badge"
import { useNavigate } from "react-router-dom"

interface SearchResult {
  id: string
  title: string
  slug: string
  excerpt: string | null
  type: 'article' | 'book' | 'garden' | 'project'
  similarity: number
}

export function SemanticSearch() {
  const [open, setOpen] = useState(false)
  const [query, setQuery] = useState("")
  const [results, setResults] = useState<SearchResult[]>([])
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault()
        setOpen((open) => !open)
      }
    }

    document.addEventListener("keydown", down)
    return () => document.removeEventListener("keydown", down)
  }, [])

  useEffect(() => {
    if (!query || query.length < 3) {
      setResults([])
      return
    }

    const timer = setTimeout(async () => {
      setLoading(true)
      try {
        const res = await fetch("/api/search", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ query }),
        })
        if (res.ok) {
          const data = await res.json()
          setResults(data)
        }
      } catch (e) {
        console.error("Search failed:", e)
      } finally {
        setLoading(false)
      }
    }, 500) // Debounce search

    return () => clearTimeout(timer)
  }, [query])

  const handleSelect = (item: SearchResult) => {
    setOpen(false)
    if (item.type === 'article') {
      navigate(`/article/${item.slug}`)
    } else if (item.type === 'garden') {
      navigate(`/garden/${item.slug}`)
    } else if (item.type === 'book') {
      navigate(`/books/${item.slug}`)
    } else {
      navigate(`/#projects`) // fallback
    }
  }

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors bg-muted/30 px-3 py-1.5 rounded-full border border-border/50"
      >
        <Search className="w-4 h-4" />
        <span className="hidden sm:inline-flex">AI Semantic Search...</span>
        <span className="sm:hidden">Search...</span>
        <kbd className="pointer-events-none inline-flex h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium text-muted-foreground opacity-100 ml-2">
          <span className="text-xs">⌘</span>K
        </kbd>
      </button>
      <CommandDialog open={open} onOpenChange={setOpen}>
        <CommandInput 
          placeholder="Ask anything... e.g. 'What have you written about AI Agents?'" 
          value={query}
          onValueChange={setQuery}
        />
        <CommandList>
          <CommandEmpty>
            {loading ? (
              <div className="flex flex-col items-center justify-center p-6 text-sm text-muted-foreground gap-2">
                <Loader2 className="w-5 h-5 animate-spin text-primary" />
                <p>Generating embeddings & computing semantic similarity...</p>
              </div>
            ) : (
              query.length >= 3 ? "No relevant results found." : "Type a semantic query to search using OpenAI..."
            )}
          </CommandEmpty>
          
          {!loading && results.length > 0 && (
            <CommandGroup heading="AI Relevance Ranked Results">
              {results.map((item) => (
                <CommandItem
                  key={`${item.type}-${item.id}`}
                  onSelect={() => handleSelect(item)}
                  className="flex flex-col items-start gap-1 p-3"
                >
                  <div className="flex items-start justify-between w-full">
                    <span className="font-medium text-foreground">{item.title}</span>
                    <Badge variant="outline" className="text-[10px] uppercase tracking-wider bg-primary/5">
                      {item.type}
                    </Badge>
                  </div>
                  {item.excerpt && (
                    <span className="line-clamp-2 text-xs text-muted-foreground text-left leading-relaxed">
                      {item.excerpt}
                    </span>
                  )}
                  {item.similarity > 0 && (
                    <span className="text-[10px] text-primary/70 font-mono mt-1">
                      {Math.round(item.similarity * 100)}% match
                    </span>
                  )}
                </CommandItem>
              ))}
            </CommandGroup>
          )}
        </CommandList>
      </CommandDialog>
    </>
  )
}
