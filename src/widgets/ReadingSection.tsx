import { Link } from "react-router-dom";
import { ArrowUpRight, ArrowRight } from "lucide-react";
import { FadeIn } from "@/shared/components/animations";
import { Book } from "@/shared/types";

interface ReadingSectionProps {
  readingNowBook: Book;
  langPrefix: string;
  t: (key: string) => string;
  currentLang: string;
}

export default function ReadingSection({ readingNowBook, langPrefix, t, currentLang }: ReadingSectionProps) {
  return (
    <section className="w-full">
      <FadeIn className="mb-[32px]">
        <span className="font-sans text-[11px] font-extrabold uppercase tracking-widest text-gold mb-3 block">
          {t("reading.badge")}
        </span>
        <h2 className="font-heading text-3xl md:text-[42px] leading-tight text-foreground font-bold">
          {t("reading.title")}
        </h2>
        <p className="font-sans text-lg text-muted-foreground max-w-[650px] leading-relaxed mt-2">
          {t("reading.desc")}
        </p>
      </FadeIn>

      <FadeIn delay={0.2}>
        <div className="bg-white dark:bg-card border border-border rounded-[24px] p-8 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center text-left">
          {/* Book Cover */}
          <div className="lg:col-span-3 flex justify-center">
            <div className="w-[180px] aspect-[2/3] rounded-xl overflow-hidden bg-background border border-border shadow-md transform hover:-rotate-1 hover:scale-[1.01] transition-transform duration-500 relative group p-1 bg-white">
              <img 
                src={readingNowBook.coverImage || "https://images.unsplash.com/photo-1506880018603-83d5b814b5a6?auto=format&fit=crop&q=80&w=400"} 
                alt={readingNowBook.title}
                className="w-full h-full object-cover rounded-lg"
                loading="lazy"
              />
            </div>
          </div>

          {/* Book Info & Details */}
          <div className="lg:col-span-9 flex flex-col justify-between h-full py-2">
            <div>
              <div className="flex flex-wrap items-center justify-between gap-4 mb-4">
                <div>
                  <h3 className="font-heading text-[24px] font-bold text-foreground leading-tight">
                    {readingNowBook.title}
                  </h3>
                  <p className="text-muted-foreground text-sm font-sans mt-0.5">
                    {currentLang === "en" ? `by ${readingNowBook.author}` : currentLang === "ru" ? `автора ${readingNowBook.author}` : `${readingNowBook.author} qalamiga mansub`}
                  </p>
                </div>
                
                {/* Rating */}
                <div className="flex items-center gap-1 bg-gold/10 px-3 py-1 rounded-full text-gold text-xs font-bold">
                  <span>★</span>
                  <span>{readingNowBook.rating || 5}/5</span>
                </div>
              </div>

              {/* Progress Bar */}
              <div className="mb-6 max-w-sm">
                <div className="flex justify-between text-[10px] text-muted font-bold tracking-wider uppercase mb-1.5">
                  <span>{t("reading.progress")}</span>
                  <span className="text-gold">{readingNowBook.progress || 65}%</span>
                </div>
                <div className="w-full h-1.5 bg-background border border-border rounded-full overflow-hidden">
                  <div 
                    className="bg-gold h-full rounded-full transition-all duration-1000 ease-out" 
                    style={{ width: `${readingNowBook.progress || 65}%` }} 
                  />
                </div>
              </div>

              {/* Favorite Quote */}
              {readingNowBook.favoriteQuote && (
                <div className="border-l-2 border-gold/40 pl-4 py-1 italic text-muted-foreground text-base mb-6 font-sans">
                  "{readingNowBook.favoriteQuote.replace(/^- /, "")}"
                </div>
              )}

              {/* Lessons Learned */}
              {readingNowBook.lessonsLearned && (
                <div className="mb-4">
                  <span className="block text-[10px] font-extrabold text-gold uppercase tracking-widest mb-1.5">{t("reading.takeaways")}</span>
                  <p className="text-xs text-muted-foreground leading-relaxed max-w-[650px]">{readingNowBook.lessonsLearned}</p>
                </div>
              )}

              {/* Changed Thinking */}
              {readingNowBook.changedThinking && (
                <div className="mb-4">
                  <span className="block text-[10px] font-extrabold text-gold uppercase tracking-widest mb-1.5">Fikrlarimni qanday o'zgartirdi?</span>
                  <p className="text-xs text-muted-foreground leading-relaxed max-w-[650px] italic">{readingNowBook.changedThinking}</p>
                </div>
              )}

              {/* Related Articles */}
              {readingNowBook.relatedArticles && readingNowBook.relatedArticles.length > 0 && (
                <div>
                  <span className="block text-[10px] font-extrabold text-gold uppercase tracking-widest mb-1.5">Bog'liq maqolalar</span>
                  <div className="flex gap-4">
                    {readingNowBook.relatedArticles.map((art, i) => (
                      <Link 
                        key={i} 
                        to={`/article/${art.slug}`} 
                        className="text-xs text-primary hover:text-gold hover:underline font-semibold flex items-center gap-1 focus-ring rounded"
                      >
                        <span>{art.title}</span>
                        <ArrowUpRight className="w-3 h-3" />
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* View library CTA */}
            <div className="mt-8 pt-6 border-t border-border/50 flex justify-end">
              <Link 
                to={`${langPrefix}/books`}
                className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-gold hover:text-gold-hover hover:underline underline-offset-4 decoration-2 decoration-gold/30 transition-colors focus-ring rounded"
              >
                <span>{t("reading.library")}</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </FadeIn>
    </section>
  );
}
