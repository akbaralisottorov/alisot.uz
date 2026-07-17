import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { SEO } from "@/shared/components/SEO";
import { ArrowLeft, BookOpen, User, Star, Quote, Lightbulb, Bookmark } from "lucide-react";
import { Badge } from "@/shared/ui/badge";
import Markdown from "react-markdown";
import { useReadingProgress } from "@/shared/hooks/use-reading-progress";
import { Book } from "@/shared/types";

export default function BookPage() {
  const { slug } = useParams();
  const [book, setBook] = useState<Book | null>(null);
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
    return <div className="w-full flex justify-center py-20 text-muted-foreground font-medium">Kutubxona yuklanmoqda...</div>;
  }

  if (!book) {
    return (
      <div className="w-full flex flex-col justify-center items-center py-32 text-center">
        <BookOpen className="w-16 h-16 text-muted-foreground/30 mb-6 animate-pulse" />
        <h1 className="font-heading text-2xl font-bold text-foreground mb-4">Kitob topilmadi</h1>
        <p className="font-sans text-muted-foreground mb-8 max-w-md leading-relaxed">Siz qidirayotgan kitob mavjud emas yoki kutubxonadan o'chirilgan.</p>
        <Link to="/books" className="px-6 py-2.5 bg-gold hover:bg-gold-hover text-white rounded-[24px] text-xs uppercase tracking-wider font-bold transition-all duration-300 shadow-sm shadow-gold/10 hover:shadow-md hover:shadow-gold/25 hover:-translate-y-[1px] active:translate-y-0 active:scale-[0.98] focus-ring inline-flex items-center gap-2">
          <ArrowLeft className="w-4 h-4" /> Kutubxonaga qaytish
        </Link>
      </div>
    );
  }

  return (
    <div className="w-full max-w-[1000px] mx-auto py-12 px-6 md:px-12 text-left selection:bg-gold/25 selection:text-foreground">
      <SEO 
        title={`${book.title} - Kitob mutolaasi`}
        description={book.summary || `${book.author} qalamiga mansub "${book.title}" kitobi bo'yicha tahlillar va xulosalar.`}
        image={book.coverImage || undefined}
      />
      
      <Link to="/books" className="inline-flex items-center text-sm font-semibold text-muted-foreground hover:text-gold mb-12 transition-colors focus-ring rounded">
        <ArrowLeft className="w-4 h-4 mr-2" /> Kutubxonaga qaytish
      </Link>
      
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-[32px] items-start">
        {/* Sidebar / Cover */}
        <div className="lg:col-span-4 flex flex-col gap-[32px]">
          <div className="w-full aspect-[2/3] rounded-[24px] overflow-hidden bg-white border border-border shadow-sm relative group p-1.5">
            {book.coverImage ? (
              <img src={book.coverImage} alt={book.title} loading="lazy" className="w-full h-full object-cover rounded-[18px] grayscale" />
            ) : (
              <div className="w-full h-full flex flex-col items-center justify-center text-muted bg-background p-8 text-center rounded-[18px]">
                <BookOpen className="w-16 h-16 mb-4 opacity-50" />
                <span className="text-xl font-bold font-heading leading-tight">{book.title}</span>
              </div>
            )}
            
            {book.status === "READING" && (
              <div className="absolute top-0 left-0 w-full h-1.5 bg-black/45 backdrop-blur-md">
                 <div className="bg-gold h-full rounded-full" style={{ width: `${Math.min(100, Math.max(0, book.progress))}%` }}></div>
              </div>
            )}
          </div>
          
          <div className="bg-white dark:bg-card border border-border rounded-[24px] p-8 space-y-[12px] shadow-sm">
            <h3 className="text-[10px] font-extrabold uppercase tracking-widest text-gold mb-4">Metadata</h3>
            
            <div className="flex items-center gap-3 text-sm text-foreground">
              <User className="w-4 h-4 text-muted" /> 
              <span className="font-semibold">{book.author}</span>
            </div>
            
            {book.rating > 0 && (
              <div className="flex items-center gap-3 text-sm text-foreground">
                <Star className="w-4 h-4 text-gold fill-current" /> 
                <span className="font-semibold">Reyting: {book.rating}/5</span>
              </div>
            )}
            
            <div className="flex items-center gap-3 text-sm text-foreground">
              <Bookmark className="w-4 h-4 text-muted" /> 
              <span className="font-semibold">Holati: {
                book.status === "READING" ? "O'qilmoqda" : 
                book.status === "COMPLETED" ? "Tugatilgan" : 
                "O'qish rejalashtirilgan"
              }</span>
            </div>

            {book.status === "READING" && (
              <div className="space-y-2 pt-3 border-t border-border/50">
                <div className="flex justify-between text-[10px] font-bold text-muted uppercase tracking-wider">
                  <span>Mutolaa jarayoni</span>
                  <span className="text-gold">{book.progress}%</span>
                </div>
                <div className="w-full bg-background border border-border h-1.5 rounded-full overflow-hidden">
                  <div className="bg-gold h-full rounded-full transition-all duration-500" style={{ width: `${book.progress}%` }}></div>
                </div>
              </div>
            )}
            
            {book.category && (
              <div className="pt-3 border-t border-border/50">
                <Badge variant="outline" className="bg-background text-muted-foreground border-border rounded-lg">{book.category.name}</Badge>
              </div>
            )}
          </div>
        </div>
        
        {/* Main Content */}
        <div className="lg:col-span-8 flex flex-col pt-2 text-left">
          <div className="mb-10 pb-8 border-b border-border/60">
            <h1 className="font-heading font-extrabold text-3xl md:text-[42px] leading-tight text-foreground mb-3">
              {book.title}
            </h1>
            <p className="text-sm font-bold uppercase tracking-wider text-muted-foreground">
              Muallif: <span className="text-foreground">{book.author}</span>
            </p>
          </div>
          
          <div className="space-y-[32px]">
            {/* Summary Section */}
            {book.summary && (
              <section className="bg-white dark:bg-card border border-border p-8 rounded-[24px] shadow-sm">
                <h3 className="flex items-center gap-2 font-heading text-lg font-bold text-foreground mb-6">
                  <BookOpen className="w-5 h-5 text-gold" /> Kitob haqida qisqacha
                </h3>
                <div className="prose dark:prose-invert max-w-[650px] text-muted-foreground leading-relaxed text-base">
                  <Markdown>{book.summary}</Markdown>
                </div>
              </section>
            )}
            
            {/* Key Ideas */}
            {book.keyIdeas && (
              <section className="p-8 bg-white dark:bg-card border border-border rounded-[24px] shadow-sm">
                <h3 className="flex items-center gap-2 font-heading text-lg font-bold text-foreground mb-6">
                  <Lightbulb className="w-5 h-5 text-gold" /> Asosiy g'oyalar va xulosalar
                </h3>
                <div className="prose dark:prose-invert max-w-[650px] text-muted-foreground leading-relaxed text-base">
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
              <section className="bg-primary/5 p-8 rounded-[24px] border border-primary/10 relative overflow-hidden">
                <div className="absolute -top-6 -right-6 opacity-[0.03] text-primary">
                  <Quote className="w-48 h-48" />
                </div>
                <h3 className="flex items-center gap-2 font-heading text-lg font-bold text-foreground mb-6 relative z-10">
                  <Quote className="w-5 h-5 text-gold" /> Sevimli iqtiboslar
                </h3>
                <div className="relative z-10 max-w-[650px]">
                  <Markdown
                    components={{
                      blockquote: ({ node, ...props }) => (
                        <blockquote className="pl-6 border-l-4 border-gold italic my-6 text-lg text-muted-foreground font-serif bg-gold/[0.02] py-4 pr-4 rounded-r-xl" {...props} />
                      ),
                      p: ({ node, ...props }) => <p className="mb-4 last:mb-0 leading-relaxed font-serif italic text-muted-foreground/90" {...props} />,
                      li: ({ node, ...props }) => (
                        <li className="mb-4 last:mb-0 pl-6 border-l-2 border-gold/40 italic font-serif text-muted-foreground bg-gold/[0.01] py-3 pr-3 rounded-r-lg list-none relative before:content-['“'] before:absolute before:-left-1 before:text-gold before:opacity-30 before:text-2xl before:-top-2" {...props} />
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
              <section className="p-8 bg-white dark:bg-card border border-border rounded-[24px] shadow-sm">
                <h3 className="flex items-center gap-2 font-heading text-lg font-bold text-foreground mb-8">
                  <User className="w-5 h-5 text-gold" /> Shaxsiy fikr va mulohazalar
                </h3>
                
                <div className="flex gap-4 items-start">
                  {/* Akbarali Avatar */}
                  <div className="flex-shrink-0 w-12 h-12 rounded-full bg-gold flex items-center justify-center text-white font-heading text-xs font-bold uppercase">
                    AS
                  </div>
                  
                  {/* Speech Bubble */}
                  <div className="flex-1 relative bg-background border border-border rounded-[20px] p-6">
                    {/* Speech Bubble Arrow */}
                    <div className="absolute top-5 -left-[9px] w-4 h-4 bg-background border-b border-l border-border rotate-45" />
                    
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-1 mb-4 border-b border-border/50 pb-2">
                      <span className="font-semibold text-foreground text-sm font-sans">Akbarali Sottorov</span>
                      <span className="text-xs text-muted-foreground font-sans">Marketing & Brand Strategist</span>
                    </div>
                    
                    <div className="prose dark:prose-invert max-w-[650px] leading-relaxed text-muted-foreground text-sm md:text-base">
                      <Markdown>{book.personalInsights}</Markdown>
                    </div>
                  </div>
                </div>
              </section>
            )}

            {/* How it changed my thinking & Related Articles */}
            {(() => {
              const bookStoryMap: Record<string, { changed: string; articles: Array<{ title: string; slug: string }> }> = {
                "thinking-fast-and-slow": {
                  changed: "Kahnemanning asari marketing va dizayndagi har qanday chiroyli interfeys aslida foydalanuvchining intuitiv kognitiv qarshiliklarini (Tizim 1 darajasidagi yukni) yengillatishga xizmat qilishi lozimligini isbotlab berdi.",
                  articles: [{ title: "Tanlov psixologiyasi: Nima uchun biz sotib olamiz?", slug: "psychology-of-choice" }]
                },
                "influence": {
                  changed: "Ishontirish tamoyillarining amaliy tahlili mening barcha marketing va brending kampaniyalarimda eng birinchi navbatda foydalanuvchiga beg'araz qiymat berish (Reciprocity) asosiy zanjir bo'lishi kerakligini ko'rsatdi.",
                  articles: [{ title: "Tanlov psixologiyasi: Nima uchun biz sotib olamiz?", slug: "psychology-of-choice" }]
                },
                "predictably-irrational": {
                  changed: "Insonlar o'z xatti-harakatlarida irratsional bo'lishsa-da, bu irratsionallik ma'lum bir tizimli qoliplarga ega ekani narx shakllantirish va marketing strategiyalarida fundamental ekanini ko'rsatdi.",
                  articles: [{ title: "Tanlov psixologiyasi: Nima uchun biz sotib olamiz?", slug: "psychology-of-choice" }]
                },
                "nudge": {
                  changed: "Tanlov arxitekturasining kuchi odamlarga ta'sir o'tkazishda majburlash emas, balki eng optimal yo'lni eng oson variant (default) qilish orqali erishilishini isbotladi.",
                  articles: [{ title: "Tanlov psixologiyasi: Nima uchun biz sotib olamiz?", slug: "psychology-of-choice" }]
                },
                "1984": {
                  changed: "Axborot monopoliyasi va propaganda orqali shaxsiy diqqatni boshqarish qanchalik oson ekani brend marketingdagi mas'uliyat va axloq chegaralarini aniq belgilab olishga yordam berdi.",
                  articles: []
                }
              };

              const story = bookStoryMap[book.slug];
              if (!story) return null;

              return (
                <>
                  <section className="p-8 bg-white dark:bg-card border border-border rounded-[24px] shadow-sm">
                    <h3 className="flex items-center gap-2 font-heading text-lg font-bold text-foreground mb-6">
                      <Lightbulb className="w-5 h-5 text-gold" /> Dunyoqarashimni qanday o'zgartirdi?
                    </h3>
                    <p className="font-sans text-sm md:text-base text-muted-foreground leading-relaxed max-w-[650px] italic">
                      {story.changed}
                    </p>
                  </section>

                  {story.articles && story.articles.length > 0 && (
                    <section className="p-8 bg-white dark:bg-card border border-border rounded-[24px] shadow-sm">
                      <h3 className="flex items-center gap-2 font-heading text-lg font-bold text-foreground mb-6">
                        <Bookmark className="w-5 h-5 text-gold" /> Bog'liq maqolalar va tahlillar
                      </h3>
                      <div className="flex flex-col gap-3">
                        {story.articles.map((art, idx) => (
                          <Link key={idx} to={`/article/${art.slug}`} className="text-sm font-semibold text-primary hover:text-gold flex items-center gap-1.5 focus-ring rounded w-fit">
                            <span>{art.title}</span>
                            <ArrowLeft className="w-3.5 h-3.5 rotate-180" />
                          </Link>
                        ))}
                      </div>
                    </section>
                  )}
                </>
              );
            })()}
            
            {(!book.summary && !book.keyIdeas && !book.favoriteQuotes && !book.personalInsights) && (
              <div className="py-20 text-center bg-white dark:bg-card border border-border border-dashed rounded-[24px]">
                 <p className="text-muted-foreground italic font-medium">Ushbu kitob uchun mutolaa qaydlari hali e'lon qilinmagan.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
