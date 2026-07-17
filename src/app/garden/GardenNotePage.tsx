import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { SEO } from "@/shared/components/SEO";
import { ArrowLeft, Leaf, Network, Tag, Sprout } from "lucide-react";
import Markdown from "react-markdown";
import { useReadingProgress } from "@/shared/hooks/use-reading-progress";
import { GardenNote } from "@/shared/types";

export default function GardenNotePage() {
  const { slug } = useParams();
  const [note, setNote] = useState<GardenNote | null>(null);
  const [loading, setLoading] = useState(true);

  useReadingProgress(note?.title || "", "note");

  useEffect(() => {
    fetch(`/api/garden/${slug}`)
      .then(res => res.json())
      .then(data => {
        if (!data.error) {
          setNote(data);
        } else {
          setNote(null);
        }
      })
      .catch(console.error)
      .finally(() => setLoading(false));
  }, [slug]);

  if (loading) {
    return <div className="w-full flex justify-center py-20 text-muted-foreground font-medium">Qayd yuklanmoqda...</div>;
  }

  if (!note) {
    return (
      <div className="w-full flex flex-col justify-center items-center py-32 text-center">
        <Leaf className="w-16 h-16 text-muted-foreground/30 mb-6 animate-pulse" />
        <h1 className="font-heading text-2xl font-bold text-foreground mb-4">Qayd topilmadi</h1>
        <p className="font-sans text-muted-foreground mb-8 max-w-md leading-relaxed">Ushbu qayd o'chirilgan yoki hali yaratilmagan bo'lishi mumkin.</p>
        <Link to="/garden" className="px-6 py-2.5 bg-gold hover:bg-gold-hover text-white rounded-[24px] text-xs uppercase tracking-wider font-bold transition-all duration-300 shadow-sm shadow-gold/10 hover:shadow-md hover:shadow-gold/25 hover:-translate-y-[1px] active:translate-y-0 active:scale-[0.98] focus-ring inline-flex items-center gap-2">
          <ArrowLeft className="w-4 h-4" /> Bog'ga qaytish
        </Link>
      </div>
    );
  }

  const tagsList = note.tags ? note.tags.split(",").map((t: string) => t.trim()).filter(Boolean) : [];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "SEEDLING": return "text-gold border-gold/30 bg-gold/5";
      case "INCUBATOR": return "text-secondary border-secondary/30 bg-secondary/5";
      case "EVERGREEN": return "text-success border-success/30 bg-success/5";
      default: return "text-muted border-border bg-background";
    }
  };

  const getStatusIcon = (status: string) => {
    if (status === "SEEDLING") return <Sprout className="w-4 h-4 text-gold" />;
    return <Leaf className="w-4 h-4 text-secondary" />;
  };

  return (
    <div className="w-full max-w-[1000px] mx-auto py-12 px-6 md:px-12 text-left selection:bg-gold/25 selection:text-foreground">
      <SEO 
        title={`${note.title} - Raqamli Bog'`}
        description={note.content.substring(0, 150)}
      />
      
      <Link to="/garden" className="inline-flex items-center text-sm font-semibold text-muted-foreground hover:text-gold mb-12 transition-colors focus-ring rounded">
        <ArrowLeft className="w-4 h-4 mr-2" /> Bog'ga qaytish
      </Link>
      
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-[32px] items-start">
        {/* Main Content */}
        <div className="lg:col-span-8 flex flex-col">
          <div className="mb-10 pb-8 border-b border-border/60">
            <h1 className="font-heading font-extrabold text-3xl md:text-[42px] leading-tight text-foreground mb-6">
              {note.title}
            </h1>
            <div className="flex flex-wrap items-center gap-4 text-xs text-muted-foreground">
              <span className={`flex items-center gap-1.5 px-3.5 py-1 rounded-full text-[10px] font-bold border ${getStatusColor(note.status)}`}>
                {getStatusIcon(note.status)}
                <span className="uppercase tracking-widest">
                  {note.status === "SEEDLING" ? "Seedling" : note.status === "INCUBATOR" ? "Incubator" : "Evergreen"}
                </span>
              </span>
              <span className="italic text-primary dark:text-gold font-sans font-medium">
                {
                  note.status === "SEEDLING" ? "Yangi g'oya — hali rivojlanmoqda" :
                  note.status === "INCUBATOR" ? "O'sib bormoqda — regularly update" :
                  "Pishgan fikr — barqaror"
                }
              </span>
              <span className="text-muted/80">Yangilandi: {new Date(note.updatedAt).toLocaleDateString()}</span>
            </div>
          </div>
          
          <div className="prose dark:prose-invert max-w-[650px] text-muted-foreground leading-relaxed text-base">
            <Markdown>{note.content}</Markdown>
          </div>
        </div>

        {/* Sidebar */}
        <div className="lg:col-span-4 flex flex-col gap-[32px]">
          <div className="bg-white dark:bg-card border border-border rounded-[24px] p-8 shadow-sm">
            <h3 className="flex items-center gap-2 text-[10px] font-extrabold uppercase tracking-widest text-gold mb-6 border-b border-border/50 pb-2">
              <Network className="w-4 h-4" /> Bog'liqliklar
            </h3>
            
            <div className="space-y-6">
              {/* Linked Nodes */}
              <div>
                <h4 className="text-xs font-bold text-foreground mb-3 uppercase tracking-wider">Chiquvchi havolalar</h4>
                {note.linkedNodes && note.linkedNodes.length > 0 ? (
                  <ul className="space-y-3">
                    {note.linkedNodes.map((linkedNote: GardenNote) => (
                      <li key={linkedNote.slug} className="border-l border-border pl-3.5 hover:border-gold transition-colors">
                        <Link to={`/garden/${linkedNote.slug}`} className="text-sm text-foreground hover:text-gold flex flex-col gap-0.5 focus-ring rounded px-1">
                          <span className="font-semibold leading-tight">{linkedNote.title}</span>
                          <span className="text-[10px] text-muted-foreground font-bold uppercase tracking-widest">
                            {linkedNote.status}
                          </span>
                        </Link>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="text-xs text-muted-foreground/60 italic">Chiquvchi havolalar yo'q</p>
                )}
              </div>

              {/* Backlinks */}
              <div className="pt-4 border-t border-border/50">
                <h4 className="text-xs font-bold text-foreground mb-3 uppercase tracking-wider">Ortga havolalar</h4>
                {note.backlinks && note.backlinks.length > 0 ? (
                  <ul className="space-y-3">
                    {note.backlinks.map((backlink: GardenNote) => (
                      <li key={backlink.slug} className="border-l border-border pl-3.5 hover:border-gold transition-colors">
                        <Link to={`/garden/${backlink.slug}`} className="text-sm text-foreground hover:text-gold flex flex-col gap-0.5 focus-ring rounded px-1">
                          <span className="font-semibold leading-tight">{backlink.title}</span>
                          <span className="text-[10px] text-muted-foreground font-bold uppercase tracking-widest">
                            {backlink.status}
                          </span>
                        </Link>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="text-xs text-muted-foreground/60 italic">Ortga havolalar yo'q</p>
                )}
              </div>
            </div>
          </div>
          
          {tagsList.length > 0 && (
            <div className="bg-white dark:bg-card border border-border rounded-[24px] p-8 shadow-sm">
              <h3 className="flex items-center gap-2 text-[10px] font-extrabold uppercase tracking-widest text-gold mb-4 border-b border-border/50 pb-2">
                <Tag className="w-4 h-4" /> Mavzular
              </h3>
              <div className="flex flex-wrap gap-2">
                {tagsList.map((tag: string) => (
                  <Link key={tag} to={`/garden?tag=${encodeURIComponent(tag)}`} className="text-[11px] font-semibold text-muted bg-background border border-border/80 px-2.5 py-1 rounded-lg hover:border-gold hover:text-gold transition-colors focus-ring">
                    #{tag}
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
