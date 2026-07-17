import { Link } from "react-router-dom";
import { Calendar, Clock, ArrowUpRight } from "lucide-react";
import { FadeIn } from "@/shared/components/animations";
import { Article } from "@/shared/types";

interface FeaturedArticleSectionProps {
  featuredArticle: Article;
  langPrefix: string;
  t: (key: string) => string;
}

export default function FeaturedArticleSection({ featuredArticle, langPrefix, t }: FeaturedArticleSectionProps) {
  return (
    <section className="w-full">
      <FadeIn className="mb-[32px]">
        <span className="font-sans text-[11px] font-extrabold uppercase tracking-widest text-gold mb-3 block">
          {t("featured.badge")}
        </span>
        <h2 className="font-heading text-3xl md:text-[42px] leading-tight text-foreground font-bold">
          {t("featured.title")}
        </h2>
      </FadeIn>

      <FadeIn delay={0.2}>
        <div className="bg-white dark:bg-card border border-border rounded-[24px] overflow-hidden grid grid-cols-1 lg:grid-cols-12 gap-8 p-8 group hover:border-gold/50 hover:shadow-md transition-all duration-300">
          {/* Cover Image */}
          <div className="lg:col-span-6 rounded-[18px] overflow-hidden aspect-[16/10] bg-background border border-border relative">
            <img 
              src={featuredArticle.coverImage || "/featured_cover.png"} 
              alt={featuredArticle.title} 
              className="w-full h-full object-cover group-hover:scale-[1.01] transition-transform duration-500 ease-out"
              loading="lazy"
            />
            <div className="absolute top-4 left-4 bg-white/90 dark:bg-card/90 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-border/40 text-[10px] font-extrabold tracking-widest text-primary dark:text-gold uppercase">
              {featuredArticle.category || "Behavioral Economics"}
            </div>
          </div>

          {/* Content Details */}
          <div className="lg:col-span-6 flex flex-col justify-between py-2 text-left">
            <div>
              <div className="flex items-center gap-2 text-[10px] text-muted font-bold tracking-wider uppercase mb-3">
                <Calendar className="w-3.5 h-3.5" />
                <span>{new Date(featuredArticle.createdAt).toLocaleDateString("uz-UZ")}</span>
                <span className="mx-1.5">&bull;</span>
                <Clock className="w-3.5 h-3.5" />
                <span>{featuredArticle.readTime || "8 min"}</span>
              </div>

              <h3 className="font-heading text-[28px] md:text-[34px] leading-[1.15] font-extrabold text-foreground mb-4 group-hover:text-gold transition-colors">
                {featuredArticle.title}
              </h3>

              <p className="font-sans text-base text-muted-foreground max-w-[650px] leading-relaxed mb-6 line-clamp-3">
                {featuredArticle.excerpt || featuredArticle.content?.substring(0, 180).replace(/<[^>]*>/g, "") + "..."}
              </p>
            </div>

            {/* Author & CTA */}
            <div className="flex items-center justify-between border-t border-border/50 pt-6">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-gold/10 flex items-center justify-center text-gold font-heading text-xs font-bold uppercase">
                  AS
                </div>
                <span className="text-sm font-semibold text-foreground">{featuredArticle.author?.name || "Akbarali Sottorov"}</span>
              </div>

              <Link 
                to={`${langPrefix}/article/${featuredArticle.slug}`}
                className="px-6 py-2.5 bg-gold hover:bg-gold-hover text-white rounded-[24px] text-xs uppercase tracking-wider font-bold transition-all duration-300 shadow-sm shadow-gold/10 hover:shadow-md hover:shadow-gold/25 hover:-translate-y-[1px] active:translate-y-0 active:scale-[0.98] focus-ring inline-flex items-center gap-2"
              >
                <span>{t("featured.cta")}</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </div>
      </FadeIn>
    </section>
  );
}
