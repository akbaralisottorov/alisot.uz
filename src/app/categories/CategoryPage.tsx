import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { SEO } from "@/shared/components/SEO";
import { FadeIn, StaggerContainer, StaggerItem } from "@/shared/components/animations";
import { useTranslation } from "@/shared/lib/i18n";
import { Article } from "@/shared/types";
import { Layers, FileText, ArrowLeft, BarChart2 } from "lucide-react";

export default function CategoryPage() {
  const { name } = useParams<{ name: string }>();
  const { t, langPrefix, currentLang } = useTranslation();
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);

  const categoryName = name || "";

  useEffect(() => {
    setLoading(true);
    fetch("/api/articles")
      .then(res => res.json())
      .then(data => {
        if (Array.isArray(data)) {
          setArticles(data);
        }
      })
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  const matchedArticles = articles.filter(a =>
    a.categories?.some(cat => cat.name.toLowerCase() === categoryName.toLowerCase())
  );

  return (
    <div className="w-full max-w-[900px] mx-auto py-16 px-6 md:px-12 flex flex-col gap-12 selection:bg-gold/25 selection:text-foreground">
      <SEO 
        title={`Category: ${categoryName} — Akbarali Sottorov`} 
        description={`Explore all articles and publications structured under the ${categoryName} category.`}
      />

      {/* Back link */}
      <FadeIn>
        <Link 
          to={`${langPrefix}/`} 
          className="inline-flex items-center gap-2 text-xs font-extrabold uppercase tracking-widest text-muted-foreground hover:text-gold transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>{currentLang === "uz" ? "Bosh sahifa" : "Digital Home"}</span>
        </Link>
      </FadeIn>

      {/* Header */}
      <FadeIn delay={0.1}>
        <div className="flex flex-col gap-4 border-b border-border/60 pb-8 text-left">
          <div className="flex items-center gap-3 text-gold">
            <Layers className="w-8 h-8" />
            <h1 className="font-heading text-4xl md:text-[52px] leading-none text-foreground font-extrabold capitalize">
              {categoryName}
            </h1>
          </div>
          <p className="font-sans text-base text-muted-foreground leading-relaxed mt-2">
            {currentLang === "uz"
              ? `Ushbu kategoriya ostida chop etilgan maqolalar va tadqiqot ishlari.`
              : `Articles, research notes, and essays published under the ${categoryName} category.`}
          </p>
        </div>
      </FadeIn>

      {/* Stats Overview */}
      <FadeIn delay={0.2}>
        <div className="bg-white dark:bg-card border border-border/80 rounded-2xl p-6 flex items-center justify-between text-left">
          <div className="flex items-center gap-3">
            <BarChart2 className="w-5 h-5 text-gold shrink-0" />
            <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
              Category Statistics
            </span>
          </div>
          <div className="flex items-baseline gap-1 text-gold">
            <span className="text-2xl font-bold font-heading">{matchedArticles.length}</span>
            <span className="text-xs text-muted-foreground">publications</span>
          </div>
        </div>
      </FadeIn>

      {/* List */}
      {loading ? (
        <div className="text-center text-muted py-12">Qidirilmoqda...</div>
      ) : matchedArticles.length === 0 ? (
        <div className="text-center text-muted-foreground py-12">
          {currentLang === "uz" ? "Ushbu kategoriyada maqolalar topilmadi." : "No articles found in this category."}
        </div>
      ) : (
        <StaggerContainer className="flex flex-col gap-6 text-left">
          {matchedArticles.map((art) => (
            <StaggerItem key={art.id}>
              <Link 
                to={`${langPrefix}/article/${art.slug}`}
                className="bg-white dark:bg-card border border-border/80 hover:border-gold/30 rounded-2xl p-8 flex flex-col gap-3 group transition-colors block"
              >
                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-bold text-gold uppercase tracking-wider bg-gold/5 border border-gold/15 px-2.5 py-1 rounded">
                    {categoryName}
                  </span>
                  <span className="text-[10px] text-muted font-bold font-sans">
                    {new Date(art.createdAt).toLocaleDateString(currentLang === "en" ? "en-US" : "uz-UZ")}
                  </span>
                </div>
                <h3 className="font-heading text-xl font-bold text-foreground group-hover:text-gold transition-colors">
                  {art.title}
                </h3>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  {art.excerpt}
                </p>
                <span className="text-[10px] font-bold text-gold uppercase tracking-widest flex items-center gap-1 mt-2">
                  {currentLang === "uz" ? "O'qish" : "Read publication"} &rarr;
                </span>
              </Link>
            </StaggerItem>
          ))}
        </StaggerContainer>
      )}
    </div>
  );
}
