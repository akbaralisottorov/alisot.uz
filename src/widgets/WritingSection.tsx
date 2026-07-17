import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import { FadeIn, StaggerContainer, StaggerItem } from "@/shared/components/animations";
import { Article, Language } from "@/shared/types";
import { useTranslation } from "@/shared/lib/i18n";

interface WritingSectionProps {
  articles: Article[];
  langPrefix: string;
  currentLang: Language;
  error: string | null;
}

export default function WritingSection({ articles, langPrefix, currentLang, error }: WritingSectionProps) {
  const { t } = useTranslation();

  return (
    <section id="writing" className="w-full">
      <FadeIn className="mb-[32px]">
        <span className="font-sans text-[11px] font-extrabold uppercase tracking-widest text-gold mb-3 block">
          {t("writing.badge")}
        </span>
        <h2 className="font-heading text-3xl md:text-[42px] leading-tight text-foreground font-bold">
          {t("writing.title")}
        </h2>
        <p className="font-sans text-lg text-muted-foreground max-w-[650px] leading-relaxed mt-2">
          {t("writing.desc")}
        </p>
      </FadeIn>

      {error ? (
        <div className="bg-destructive/10 border border-destructive/20 rounded-[20px] p-6 text-destructive-foreground text-sm text-left">
          {t("writing.db_error")} {error}
        </div>
      ) : articles.length === 0 ? (
        <div className="bg-white dark:bg-card border border-border rounded-[24px] p-12 text-center text-muted-foreground">
          {t("writing.empty")}
        </div>
      ) : (
        <StaggerContainer className="grid grid-cols-1 md:grid-cols-3 gap-[32px]">
          {articles.slice(0, 3).map((article) => (
            <StaggerItem key={article.id}>
              <Link to={`${langPrefix}/article/${article.slug}`} className="group flex flex-col bg-white dark:bg-card border border-border p-8 rounded-[24px] h-full hover:border-gold hover:-translate-y-1.5 hover:shadow-md transition-all duration-300 text-left focus-ring">
                {article.coverImage && (
                  <div className="aspect-[16/10] rounded-[16px] overflow-hidden bg-background border border-border/50 mb-5 relative">
                    <img src={article.coverImage} alt={article.title} className="w-full h-full object-cover group-hover:scale-[1.01] transition-transform duration-500" loading="lazy" />
                  </div>
                )}
                
                <div className="flex-1 flex flex-col justify-between">
                  <div>
                    <span className="text-[10px] font-bold text-gold tracking-widest uppercase block mb-3">
                      {article.categories?.[0]?.name || "Behavioral Economics"}
                    </span>
                    <h3 className="font-heading text-[22px] font-bold text-foreground mb-3 leading-snug group-hover:text-gold transition-colors line-clamp-2">
                      {article.title}
                    </h3>
                    <p className="text-sm text-muted-foreground leading-relaxed line-clamp-3 mb-6">
                      {article.excerpt || article.content.substring(0, 100).replace(/<[^>]*>/g, "") + "..."}
                    </p>
                  </div>

                  <div className="flex items-center justify-between text-xs text-muted font-medium border-t border-border/50 pt-4 mt-auto">
                    <span>{new Date(article.createdAt).toLocaleDateString(currentLang === "uz" ? "uz-UZ" : currentLang === "ru" ? "ru-RU" : "en-US")}</span>
                    <span className="group-hover:text-gold transition-colors flex items-center gap-1 font-bold uppercase tracking-wider text-[10px]">
                      {t("writing.cta")}
                      <ArrowUpRight className="w-3.5 h-3.5 transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
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
