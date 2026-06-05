export default function Footer() {
  return (
    <footer className="flex flex-col md:flex-row items-center justify-between text-[10px] text-muted-foreground px-2 py-6 border-t border-border/20 mt-8 gap-4">
      <p className="uppercase tracking-widest font-bold">
        © {new Date().getFullYear()} ALISOT.UZ — DESIGNED & CODED BY AKBARALI SOTTOROV
      </p>
      <div className="flex gap-4 uppercase font-bold tracking-widest items-center">
         <a href="https://github.com/akbaralisottorov" target="_blank" rel="noreferrer" className="hover:text-primary transition-colors">GitHub</a>
         <a href="https://github.com/akbaralisottorov/alisot.uz.git" target="_blank" rel="noreferrer" className="hover:text-primary transition-colors">Source</a>
         <div className="h-3 w-px bg-border/50" />
         <a href="/rss.xml" target="_blank" rel="noreferrer" className="hover:text-primary transition-colors">RSS</a>
         <div className="h-3 w-px bg-border/50" />
         <a href="/admin" className="hover:text-primary transition-colors">Admin</a>
      </div>
    </footer>
  )
}

