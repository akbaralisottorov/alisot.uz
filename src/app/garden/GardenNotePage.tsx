import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { SEO } from "@/components/SEO";
import { ArrowLeft, Leaf, Network, Tag } from "lucide-react";
import Markdown from "react-markdown";
import { useReadingProgress } from "@/lib/use-reading-progress";

export default function GardenNotePage() {
  const { slug } = useParams();
  const [note, setNote] = useState<any>(null);
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
    return <div className="w-full flex justify-center py-20 text-muted-foreground">Qayd yuklanmoqda...</div>;
  }

  if (!note) {
    return (
      <div className="w-full flex flex-col justify-center items-center py-32 text-center">
        <Leaf className="w-16 h-16 text-muted-foreground/30 mb-6" />
        <h1 className="text-2xl font-bold text-foreground mb-4">Qayd topilmadi</h1>
        <p className="text-muted-foreground mb-8 max-w-md">Ushbu qayd o'chirilgan yoki hali yaratilmagan bo'lishi mumkin.</p>
        <Link to="/garden" className="text-primary font-medium hover:underline flex items-center gap-2">
          <ArrowLeft className="w-4 h-4" /> Bog'ga qaytish
        </Link>
      </div>
    );
  }

  const tagsList = note.tags ? note.tags.split(",").map((t: string) => t.trim()).filter(Boolean) : [];

  return (
    <div className="w-full max-w-5xl mx-auto py-8 px-6">
      <SEO 
        title={`${note.title} - Raqamli Bog'`}
        description={note.content.substring(0, 150)}
      />
      
      <Link to="/garden" className="inline-flex items-center text-sm font-medium text-muted-foreground hover:text-primary mb-8 transition-colors">
        <ArrowLeft className="w-4 h-4 mr-2" /> Bog'ga qaytish
      </Link>
      
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        {/* Main Content */}
        <div className="lg:col-span-8 flex flex-col">
          <div className="mb-8 block border-b border-border pb-8">
            <h1 className="text-4xl md:text-5xl font-bold font-heading text-foreground mb-4 leading-tight">
              {note.title}
            </h1>
            <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
              <span className="bg-card border border-border px-3 py-1 rounded-full text-foreground text-xs font-semibold uppercase tracking-wider">
                {note.status === "SEEDLING" ? "Seedling" : note.status === "INCUBATOR" ? "Incubator" : "Evergreen"}
              </span>
              <span className="italic text-primary text-xs">
                {
                  note.status === "SEEDLING" ? "Yangi g'oya — hali rivojlanmoqda" :
                  note.status === "INCUBATOR" ? "O'sib bormoqda — regularly update" :
                  "Pishgan fikr — barqaror"
                }
              </span>
              <span>Yangilandi: {new Date(note.updatedAt).toLocaleDateString()}</span>
            </div>
          </div>
          
          <div className="prose prose-emerald dark:prose-invert max-w-none prose-p:leading-relaxed prose-p:text-muted-foreground text-base">
            <Markdown>{note.content}</Markdown>
          </div>
        </div>

        {/* Sidebar */}
        <div className="lg:col-span-4 flex flex-col gap-6">
          <div className="bg-card/50 backdrop-blur-sm rounded-2xl border border-border/60 p-6">
            <h3 className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-muted-foreground opacity-80 mb-4">
              <Network className="w-4 h-4 text-primary" /> Bog'liqliklar
            </h3>
            
            <div className="space-y-6">
              {/* Note Graph: Linked Nodes */}
              <div>
                <h4 className="text-xs font-semibold text-foreground border-b border-border/40 pb-2 mb-3">Chiquvchi havolalar</h4>
                {note.linkedNodes && note.linkedNodes.length > 0 ? (
                  <ul className="space-y-2">
                    {note.linkedNodes.map((linkedNote: any) => (
                      <li key={linkedNote.slug}>
                        <Link to={`/garden/${linkedNote.slug}`} className="text-sm text-primary hover:underline flex flex-col">
                          <span className="font-medium">{linkedNote.title}</span>
                          <span className="text-xs text-muted-foreground">
                            {linkedNote.status === "SEEDLING" ? "Seedling" : linkedNote.status === "INCUBATOR" ? "Incubator" : "Evergreen"}
                          </span>
                        </Link>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="text-xs text-muted-foreground/60 italic">Chiquvchi havolalar yo'q</p>
                )}
              </div>

              {/* Note Graph: Backlinks */}
              <div>
                <h4 className="text-xs font-semibold text-foreground border-b border-border/40 pb-2 mb-3">Ortga havolalar</h4>
                {note.backlinks && note.backlinks.length > 0 ? (
                  <ul className="space-y-2">
                    {note.backlinks.map((backlink: any) => (
                      <li key={backlink.slug}>
                        <Link to={`/garden/${backlink.slug}`} className="text-sm text-primary hover:underline flex flex-col">
                          <span className="font-medium">{backlink.title}</span>
                          <span className="text-xs text-muted-foreground">
                            {backlink.status === "SEEDLING" ? "Seedling" : backlink.status === "INCUBATOR" ? "Incubator" : "Evergreen"}
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
            <div className="bg-card/50 backdrop-blur-sm rounded-2xl border border-border/60 p-6">
              <h3 className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-muted-foreground opacity-80 mb-4">
                <Tag className="w-4 h-4 text-primary" /> Mavzular
              </h3>
              <div className="flex flex-wrap gap-2">
                {tagsList.map((tag: string) => (
                  <Link key={tag} to={`/garden?tag=${encodeURIComponent(tag)}`} className="text-xs text-foreground bg-input px-3 py-1.5 rounded-md border border-border/50 hover:border-primary/50 hover:text-primary transition-colors">
                    # {tag}
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
