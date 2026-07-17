import { Link } from "react-router-dom";
import { FadeIn, StaggerContainer, StaggerItem } from "@/shared/components/animations";
import { Book, Language } from "@/shared/types";

interface BooksShelfSectionProps {
  books: Book[];
  langPrefix: string;
  currentLang: Language;
  t: (key: string) => string;
}

export default function BooksShelfSection({ books, langPrefix, currentLang, t }: BooksShelfSectionProps) {
  return (
    <section className="w-full">
      <FadeIn className="mb-[32px]">
        <span className="font-sans text-[11px] font-extrabold uppercase tracking-widest text-gold mb-3 block">{t("libraryPage.badge")}</span>
        <h2 className="font-heading text-3xl md:text-[42px] leading-tight text-foreground font-bold">{t("libraryPage.title")}</h2>
        <p className="font-sans text-lg text-muted-foreground max-w-[650px] leading-relaxed mt-2">
          {t("libraryPage.desc")}
        </p>
      </FadeIn>

      {books.length === 0 ? (
        <div className="bg-white dark:bg-card border border-border rounded-[24px] p-8 text-center text-muted-foreground">
          {currentLang === "en" ? "Bookshelf is empty." : currentLang === "ru" ? "Книжная полка пуста." : "Kitob javoni bo'sh."}
        </div>
      ) : (
        <StaggerContainer className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-[32px]">
          {books.slice(0, 4).map((book) => (
            <StaggerItem key={book.id}>
              <Link to={`${langPrefix}/books/${book.slug}`} className="group flex flex-col bg-white dark:bg-card border border-border p-6 rounded-[24px] h-full hover:border-gold hover:-translate-y-1.5 hover:shadow-md transition-all duration-300 text-left focus-ring">
                <div className="aspect-[2/3] w-full bg-background rounded-lg overflow-hidden border border-border/60 mb-4 p-1 bg-white">
                  <img 
                    src={book.coverImage || ""} 
                    alt={book.title} 
                    className="w-full h-full object-cover rounded"
                    loading="lazy"
                  />
                </div>
                <div className="flex-1 flex flex-col justify-between">
                  <div>
                    <h3 className="font-heading text-[18px] font-bold text-foreground leading-snug line-clamp-1 group-hover:text-gold transition-colors">
                      {book.title}
                    </h3>
                    <p className="text-xs text-muted-foreground mb-3">{book.author}</p>
                    <p className="text-xs text-muted-foreground line-clamp-2 leading-relaxed mb-4">
                      {book.summary}
                    </p>
                  </div>

                  <div className="flex items-center justify-between text-[10px] font-bold tracking-wider uppercase pt-3 border-t border-border/55">
                    <span className="text-gold">★ {book.rating || 5}/5</span>
                    <span className="text-muted-foreground group-hover:text-gold transition-colors">
                      {currentLang === "en" ? "Thoughts &rarr;" : currentLang === "ru" ? "Отзыв &rarr;" : "Fikr &rarr;"}
                    </span>
                  </div>
                </div>
              </Link>
            </StaggerItem>
          ))}
        </StaggerContainer>
      )}
    </section>
  );
}
