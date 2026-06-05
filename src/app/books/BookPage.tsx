import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { SEO } from "@/components/SEO";
import { ArrowLeft, BookOpen, User, Star, Quote, Lightbulb, Bookmark } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import Markdown from "react-markdown";
import { useReadingProgress } from "@/lib/use-reading-progress";

export default function BookPage() {
  const { slug } = useParams();
  const [book, setBook] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useReadingProgress(book?.title || "", "book");

  useEffect(() => {
    fetch(`/api/books/${slug}`)
      .then(res => res.json())
      .then(data => {
        if (!data.error) {
          setBook(data);
        } else {
          setBook(null);
        }
      })
      .catch(console.log)
      .finally(() => setLoading(false));
  }, [slug]);

  if (loading) {
    return <div className="w-full flex justify-center py-20 text-muted-foreground">Kutubxona yuklanmoqda...</div>;
  }

  if (!book) {
    return (
      <div className="w-full flex flex-col justify-center items-center py-32 text-center">
        <BookOpen className="w-16 h-16 text-muted-foreground/30 mb-6" />
        <h1 className="text-2xl font-bold text-foreground mb-4">Kitob topilmadi</h1>
        <p className="text-muted-foreground mb-8 max-w-md">Siz qidirayotgan kitob mavjud emas yoki kutubxonadan o'chirilgan.</p>
        <Link to="/books" className="text-primary font-medium hover:underline flex items-center gap-2">
          <ArrowLeft className="w-4 h-4" /> Kutubxonaga qaytish
        </Link>
      </div>
    );
  }

  return (
    <div className="w-full max-w-6xl mx-auto py-8 px-6">
      <SEO 
        title={`${book.title} - Kitob mutolaasi`}
        description={book.summary || `${book.author} qalamiga mansub "${book.title}" kitobi bo'yicha tahlillar va xulosalar.`}
        image={book.coverImage || undefined}
      />
      
      <Link to="/books" className="inline-flex items-center text-sm font-medium text-muted-foreground hover:text-primary mb-8 transition-colors">
        <ArrowLeft className="w-4 h-4 mr-2" /> Kutubxonaga qaytish
      </Link>
      
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        {/* Sidebar / Cover */}
        <div className="lg:col-span-4 flex flex-col gap-6">
          <div className="w-full aspect-[2/3] rounded-2xl overflow-hidden bg-card/60 backdrop-blur-sm border border-border/60 shadow-2xl relative">
            {book.coverImage ? (
              <img src={book.coverImage} alt={book.title} loading="lazy" className="w-full h-full object-cover" />
            ) : (
              <div className="w-full h-full flex flex-col items-center justify-center text-muted-foreground bg-input/40 p-8 text-center">
                <BookOpen className="w-16 h-16 mb-4 opacity-50" />
                <span className="text-xl font-bold font-serif leading-tight">{book.title}</span>
              </div>
            )}
            
            {book.status === "READING" && (
              <div className="absolute top-0 left-0 w-full h-1.5 bg-black/40 backdrop-blur-sm">
                 <div className="bg-primary h-1.5" style={{ width: `${Math.min(100, Math.max(0, book.progress))}%` }}></div>
              </div>
            )}
          </div>
          
          <div className="bg-card/50 backdrop-blur-sm rounded-2xl border border-border/60 p-6 space-y-4">
            <h3 className="text-xs font-bold uppercase tracking-widest text-muted-foreground opacity-80">Ma'lumotlar</h3>
            
            <div className="flex items-center gap-3 text-sm text-foreground">
              <User className="w-4 h-4 text-muted-foreground" /> 
              <span className="flex-1">{book.author}</span>
            </div>
            
            {book.rating > 0 && (
              <div className="flex items-center gap-3 text-sm text-foreground">
                <Star className="w-4 h-4 text-amber-500" /> 
                <span className="flex-1">Reyting: {book.rating}/5</span>
              </div>
            )}
            
            <div className="flex items-center gap-3 text-sm text-foreground">
              <Bookmark className="w-4 h-4 text-primary" /> 
              <span className="flex-1">Holati: {
                book.status === "READING" ? "O'qilmoqda" : 
                book.status === "COMPLETED" ? "Tugatilgan" : 
                "O'qish rejalashtirilgan"
              }</span>
            </div>

            {book.status === "READING" && (
              <div className="space-y-1.5 pt-1">
                <div className="flex justify-between text-xs text-muted-foreground">
                  <span>Mutolaa jarayoni</span>
                  <span>{book.progress}%</span>
                </div>
                <div className="w-full bg-input rounded-full h-2 overflow-hidden border border-border/20">
                  <div className="bg-primary h-full rounded-full transition-all duration-500" style={{ width: `${book.progress}%` }}></div>
                </div>
              </div>
            )}
            
            {book.category && (
              <div className="pt-2">
                <Badge variant="secondary" className="bg-input/60 text-foreground border-border/50">{book.category.name}</Badge>
              </div>
            )}
          </div>
        </div>
        
        {/* Main Content */}
        <div className="lg:col-span-8 flex flex-col pt-2">
          <div className="mb-10 block">
            <h1 className="text-4xl md:text-5xl font-bold font-heading text-foreground mb-3 leading-tight">
              {book.title}
            </h1>
            <h2 className="text-xl md:text-2xl text-muted-foreground font-light w-full">
              Muallif: {book.author}
            </h2>
          </div>
          
          <div className="space-y-12 w-full">
            {/* Summary Section */}
            {book.summary && (
              <section className="bg-card/30 p-8 rounded-2xl border border-border/40">
                <h3 className="flex items-center gap-2 text-lg font-bold text-foreground mb-6">
                  <BookOpen className="w-5 h-5 text-primary" /> Kitob haqida qisqacha
                </h3>
                <div className="prose prose-blue dark:prose-invert max-w-none prose-p:leading-relaxed prose-p:text-muted-foreground text-base">
                  <Markdown>{book.summary}</Markdown>
                </div>
              </section>
            )}
            
            {/* Key Ideas */}
            {book.keyIdeas && (
              <section className="p-8 pb-4">
                <h3 className="flex items-center gap-2 text-lg font-bold text-foreground mb-6">
                  <Lightbulb className="w-5 h-5 text-amber-500" /> Asosiy g'oyalar va xulosalar
                </h3>
                <div className="prose prose-amber dark:prose-invert max-w-none text-base">
                  <Markdown
                    components={{
                      ol: ({ node, ...props }) => <ol className="key-ideas-ol" {...props} />,
                      li: ({ node, ...props }) => <li className="key-ideas-li" {...props} />,
                    }}
                  >
                    {book.keyIdeas}
                  </Markdown>
                </div>
              </section>
            )}

            {/* Favorite Quotes */}
            {book.favoriteQuotes && (
              <section className="bg-primary/[0.03] dark:bg-primary/[0.01] p-8 rounded-2xl border border-primary/10 relative overflow-hidden">
                <div className="absolute -top-6 -right-6 opacity-[0.03] dark:opacity-[0.05] text-primary">
                  <Quote className="w-48 h-48" />
                </div>
                <h3 className="flex items-center gap-2 text-lg font-bold text-foreground mb-6 relative z-10">
                  <Quote className="w-5 h-5 text-primary" /> Sevimli iqtiboslar
                </h3>
                <div className="relative z-10 text-base">
                  <Markdown
                    components={{
                      blockquote: ({ node, ...props }) => (
                        <blockquote className="pl-6 border-l-4 border-primary italic my-6 text-lg text-muted-foreground font-serif bg-primary/[0.02] py-4 pr-4 rounded-r-xl" {...props} />
                      ),
                      p: ({ node, ...props }) => <p className="mb-4 last:mb-0 leading-relaxed font-serif italic text-muted-foreground/90" {...props} />,
                      li: ({ node, ...props }) => (
                        <li className="mb-4 last:mb-0 pl-6 border-l-2 border-primary/40 italic font-serif text-muted-foreground bg-primary/[0.01] py-3 pr-3 rounded-r-lg list-none relative before:content-['“'] before:absolute before:-left-1 before:text-primary before:opacity-30 before:text-2xl before:-top-2" {...props} />
                      ),
                      ul: ({ node, ...props }) => <ul className="pl-0 space-y-4" {...props} />
                    }}
                  >
                    {book.favoriteQuotes}
                  </Markdown>
                </div>
              </section>
            )}

            {/* Personal Insights */}
            {book.personalInsights && (
              <section className="p-8 bg-card/20 rounded-2xl border border-border/40">
                <h3 className="flex items-center gap-2 text-lg font-bold text-foreground mb-8">
                  <User className="w-5 h-5 text-emerald-500" /> Shaxsiy fikr va mulohazalar
                </h3>
                
                <div className="flex gap-4 items-start">
                  {/* Akbarali Avatar */}
                  <div className="flex-shrink-0 w-12 h-12 rounded-full bg-gradient-to-tr from-primary to-amber-500 flex items-center justify-center text-white font-bold text-lg shadow-md border-2 border-background select-none">
                    AS
                  </div>
                  
                  {/* Speech Bubble */}
                  <div className="flex-1 relative bg-card dark:bg-zinc-950 border border-border/80 rounded-2xl p-6 shadow-sm">
                    {/* Speech Bubble Arrow */}
                    <div className="absolute top-5 -left-[9px] w-4 h-4 bg-card dark:bg-zinc-950 border-b border-l border-border/80 rotate-45" />
                    
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-1 mb-4 border-b border-border/40 pb-2">
                      <span className="font-semibold text-foreground text-sm">Akbarali Sottorov</span>
                      <span className="text-xs text-muted-foreground">Marketing & Brand Strategist</span>
                    </div>
                    
                    <div className="prose prose-emerald dark:prose-invert max-w-none prose-p:leading-relaxed prose-p:text-muted-foreground text-sm md:text-base">
                      <Markdown>{book.personalInsights}</Markdown>
                    </div>
                  </div>
                </div>
              </section>
            )}
            
            {(!book.summary && !book.keyIdeas && !book.favoriteQuotes && !book.personalInsights) && (
              <div className="py-20 text-center bg-card/30 rounded-2xl border border-border/40 border-dashed">
                 <p className="text-muted-foreground italic">Ushbu kitob uchun mutolaa qaydlari hali e'lon qilinmagan.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
